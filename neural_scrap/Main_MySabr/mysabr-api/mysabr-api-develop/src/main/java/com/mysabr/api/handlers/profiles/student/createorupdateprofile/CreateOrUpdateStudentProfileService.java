package com.mysabr.api.handlers.profiles.student.createorupdateprofile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mysabr.api.constants.EventConstants;
import com.mysabr.api.constants.UserType;
import com.mysabr.api.exceptions.AccessDeniedException;
import com.mysabr.api.exceptions.ErrorCode;
import com.mysabr.api.security.context.UserContext;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import software.amazon.awssdk.services.eventbridge.EventBridgeClient;
import software.amazon.awssdk.services.eventbridge.model.PutEventsRequest;
import software.amazon.awssdk.services.eventbridge.model.PutEventsRequestEntry;

@ApplicationScoped
@Slf4j
public class CreateOrUpdateStudentProfileService {

    private final CreateOrUpdateStudentProfileDao studentProfileDao;
    private final EventBridgeClient eventBridge;
    private final ObjectMapper mapper;
    private final String eventBusName;
    private final UserContext userContext;

    @Inject
    public CreateOrUpdateStudentProfileService(
            CreateOrUpdateStudentProfileDao studentProfileDao,
            EventBridgeClient eventBridge,
            ObjectMapper mapper,
            UserContext userContext,
            @ConfigProperty(name = "aws.eventbridge.bus.name") String eventBusName
    ) {
        this.studentProfileDao = studentProfileDao;
        this.eventBridge = eventBridge;
        this.mapper = mapper;
        this.eventBusName = eventBusName;
        this.userContext = userContext;
    }

    @Transactional
    public void createOrUpdateProfile(CreateOrUpdateStudentProfileHttpRequest request) {
        handleCreateOrUpdateProfile(request);
    }

    private void handleCreateOrUpdateProfile(CreateOrUpdateStudentProfileHttpRequest request) {
        log.debug("handleCreateOrUpdateProfile(...) -> Method Execution Started.");
        validateUserType();
        final CreateOrUpdateStudentProfileDbEntity createUserDbEntity = CreateOrUpdateStudentProfileDbEntity.builder()
                .id(this.userContext.getUserId())
                .summary(request.getSummary())
                .build();
        studentProfileDao.createOrUpdateStudentProfile(createUserDbEntity);
        final CreateOrUpdateStudentProfileEventPayload payload = CreateOrUpdateStudentProfileEventPayload.builder()
                .id(this.userContext.getUserId())
                .build();
        this.publishEvent(payload);
        log.debug("handleCreateOrUpdateProfile(...) -> Method Execution Completion.");
    }

    private void validateUserType() {
        if (userContext.getUserType() != UserType.STUDENT) {
            throw new AccessDeniedException(ErrorCode.INVALID_USER_TYPE_OP);
        }
    }

    @SneakyThrows
    private void publishEvent(CreateOrUpdateStudentProfileEventPayload payload) {
        final String eventJson = mapper.writerWithDefaultPrettyPrinter()
                .writeValueAsString(payload);
        log.debug("createOrUpdateProfile -> publishEvent(...) -> eventJson: {}", eventJson);
        final PutEventsRequestEntry entry = PutEventsRequestEntry.builder()
                .source(EventConstants.CREATE_OR_UPDATE_PROFILE_EVENT_SOURCE)
                .detailType(EventConstants.CREATE_OR_UPDATE_PROFILE_EVENT_TYPE)
                .detail(eventJson)
                .eventBusName(eventBusName)
                .build();
        final PutEventsRequest request = PutEventsRequest.builder()
                .entries(entry)
                .build();
        eventBridge.putEvents(request);
    }
}
