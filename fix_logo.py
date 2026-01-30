"""
Fixed logo processing script - better cropping and sizing
"""

from PIL import Image
import os

def find_content_bounds(img):
    """
    Find the bounding box of non-transparent pixels
    """
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
    
    pixels = img.load()
    width, height = img.size
    
    min_x, min_y = width, height
    max_x, max_y = 0, 0
    
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            # Check if pixel has any content (not fully transparent)
            if a > 10:  # Has some opacity
                min_x = min(min_x, x)
                max_x = max(max_x, x)
                min_y = min(min_y, y)
                max_y = max(max_y, y)
    
    return (min_x, min_y, max_x + 1, max_y + 1)

def process_white_logo(input_path, output_dir):
    """Process the white droplet on black background"""
    print(f"Processing: {input_path}")
    
    img = Image.open(input_path).convert('RGBA')
    width, height = img.size
    print(f"  Original size: {width}x{height}")
    
    # Step 1: Crop to remove text at bottom (keep top 58%)
    crop_height = int(height * 0.58)
    cropped = img.crop((0, 0, width, crop_height))
    print(f"  After removing text: {cropped.size}")
    
    # Step 2: Remove black background (make transparent)
    pixels = cropped.load()
    w, h = cropped.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            # If pixel is dark (background), make transparent
            if r < 50 and g < 50 and b < 50:
                pixels[x, y] = (0, 0, 0, 0)
    
    # Step 3: Find actual content bounds and crop tightly
    bounds = find_content_bounds(cropped)
    print(f"  Content bounds: {bounds}")
    tight = cropped.crop(bounds)
    print(f"  After tight crop: {tight.size}")
    
    # Step 4: Make square with minimal padding (5%)
    tw, th = tight.size
    max_dim = max(tw, th)
    padding = int(max_dim * 0.05)  # 5% padding
    final_size = max_dim + padding * 2
    
    # Create new transparent square
    square = Image.new('RGBA', (final_size, final_size), (0, 0, 0, 0))
    
    # Center the logo
    x_offset = (final_size - tw) // 2
    y_offset = (final_size - th) // 2
    square.paste(tight, (x_offset, y_offset), tight)
    
    print(f"  Final square: {square.size}")
    
    # Step 5: Generate all sizes
    sizes = [32, 48, 64, 96, 128, 180, 192, 256, 480, 512]
    for size in sizes:
        resized = square.resize((size, size), Image.LANCZOS)
        filename = f"logo-white-{size}x{size}.png"
        filepath = os.path.join(output_dir, filename)
        resized.save(filepath, 'PNG')
        print(f"  Created: {filename}")

def process_black_logo(input_path, output_dir):
    """Process the black droplet on light background"""
    print(f"\nProcessing: {input_path}")
    
    img = Image.open(input_path).convert('RGBA')
    width, height = img.size
    print(f"  Original size: {width}x{height}")
    
    # Step 1: Crop to remove text at bottom (keep top 58%)
    crop_height = int(height * 0.58)
    cropped = img.crop((0, 0, width, crop_height))
    print(f"  After removing text: {cropped.size}")
    
    # Step 2: Remove light background (make transparent)
    pixels = cropped.load()
    w, h = cropped.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            # If pixel is light (background), make transparent
            if r > 230 and g > 230 and b > 230:
                pixels[x, y] = (0, 0, 0, 0)
    
    # Step 3: Find actual content bounds and crop tightly
    bounds = find_content_bounds(cropped)
    print(f"  Content bounds: {bounds}")
    tight = cropped.crop(bounds)
    print(f"  After tight crop: {tight.size}")
    
    # Step 4: Make square with minimal padding (5%)
    tw, th = tight.size
    max_dim = max(tw, th)
    padding = int(max_dim * 0.05)  # 5% padding
    final_size = max_dim + padding * 2
    
    # Create new transparent square
    square = Image.new('RGBA', (final_size, final_size), (0, 0, 0, 0))
    
    # Center the logo
    x_offset = (final_size - tw) // 2
    y_offset = (final_size - th) // 2
    square.paste(tight, (x_offset, y_offset), tight)
    
    print(f"  Final square: {square.size}")
    
    # Step 5: Generate all sizes
    sizes = [32, 48, 64, 96, 128, 180, 192, 256, 480, 512]
    for size in sizes:
        resized = square.resize((size, size), Image.LANCZOS)
        filename = f"logo-black-{size}x{size}.png"
        filepath = os.path.join(output_dir, filename)
        resized.save(filepath, 'PNG')
        print(f"  Created: {filename}")

def main():
    base_dir = r"D:\email sender\vibebrews-landing"
    assets_dir = os.path.join(base_dir, "assets")
    
    # Re-read from the user-provided image
    user_image = r"C:\Users\Ashwin\.cursor\projects\d-email-sender-vibebrews-landing\assets\c__Users_Ashwin_AppData_Roaming_Cursor_User_workspaceStorage_ff497b3169d9435047d746988effa766_images_image-49e91705-e7c7-4de3-a43c-d926c22ecbe7.png"
    
    # Check what's in the user's image
    if os.path.exists(user_image):
        print("Found user-provided image, checking...")
        img = Image.open(user_image)
        print(f"  Size: {img.size}, Mode: {img.mode}")
    
    # Look for original Gemini images or recreate from existing
    # Since we deleted originals, let's work with what we have
    # We'll need to find an original source
    
    # Check if there's a backup or if we can find original images
    possible_sources = [
        os.path.join(base_dir, "Gemini_Generated_Image_8o5zf68o5zf68o5z.png"),
        os.path.join(base_dir, "Gemini_Generated_Image_a6mzqga6mzqga6mz.png"),
    ]
    
    found_white = None
    found_black = None
    
    for src in possible_sources:
        if os.path.exists(src):
            print(f"Found source: {src}")
            # Determine if it's white or black based on center pixel
            img = Image.open(src).convert('RGBA')
            # Check a pixel near center-top (where droplet should be)
            cx, cy = img.size[0] // 2, img.size[1] // 4
            r, g, b, a = img.getpixel((cx, cy))
            if r > 200:  # White droplet
                found_white = src
            else:
                found_black = src
    
    if not found_white and not found_black:
        print("\nOriginal Gemini images not found!")
        print("Please re-upload the original logo images.")
        return
    
    if found_white:
        process_white_logo(found_white, assets_dir)
    if found_black:
        process_black_logo(found_black, assets_dir)
    
    print("\nDone!")

if __name__ == "__main__":
    main()
