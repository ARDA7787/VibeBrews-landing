import OpenAI from 'openai';
import { DatabaseTool } from './databaseTool';
import { DocumentProcessorTool } from './documentProcessorTool';
import { PolicyMatcherTool, Profile } from './policyMatcherTool';

export class ConversationManagerTool {
  private openai: OpenAI;
  private dbTool: DatabaseTool;
  private docTool: DocumentProcessorTool;
  private policyTool: PolicyMatcherTool;

  constructor(
    openai: OpenAI,
    dbTool: DatabaseTool,
    docTool: DocumentProcessorTool,
    policyTool: PolicyMatcherTool
  ) {
    this.openai = openai;
    this.dbTool = dbTool;
    this.docTool = docTool;
    this.policyTool = policyTool;
  }

  /**
   * Handle a user message: save it, invoke AI, save and return reply.
   */
  async handleMessage(chatId: number, content: string): Promise<string> {
    // Save the user message
    await this.dbTool.saveMessage(chatId, 'user', content);

    // Retrieve full message history and map to OpenAI message types
    const history = await this.dbTool.getMessages(chatId);
    const messages = history.map(h => ({
      role: (h.role === 'agent' ? 'assistant' : 'user') as 'user' | 'assistant',
      content: h.content
    }));

    // Call OpenAI for chat completion with proper typing
    const completion = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages as Array<{
        role: 'user' | 'assistant' | 'system';
        content: string;
      }>,
    });

    const rawReply = completion.choices[0].message.content;
    const reply = rawReply ?? '';

    // Save AI response
    await this.dbTool.saveMessage(chatId, 'agent', reply);

    return reply;
  }
}
