#!/bin/bash

PLUGIN_SLUG="accessibility-new-window-warnings"
PLUGIN_FILE="./$PLUGIN_SLUG.php"
DIST_DIR="./dist"
BUILD_DIR="$DIST_DIR/$PLUGIN_SLUG"

# Ensure dist directory exists
mkdir -p "$DIST_DIR"

# Always clear any previous build folder
rm -rfd "$BUILD_DIR"

# Extract version from main plugin file
if [ ! -f "$PLUGIN_FILE" ]; then
    echo "Error: Plugin file $PLUGIN_FILE not found" >&2
    exit 1
fi

VERSION=$(grep " * Version:" "$PLUGIN_FILE" | grep -o '[0-9.]*\(-[a-zA-Z0-9.]*\)*')

if [ -z "$VERSION" ]; then
    echo "Error: Failed to extract version from $PLUGIN_FILE" >&2
    exit 1
fi

echo "Building $PLUGIN_SLUG v$VERSION..."

# Copy distributable files to build directory
rsync -a \
    --exclude='.git' \
    --exclude='.github' \
    --exclude='.gitignore' \
    --exclude='.ptc' \
    --exclude='.wordpress-version-checker.json' \
    --exclude='node_modules' \
    --exclude='src' \
    --exclude='scripts' \
    --exclude='dist' \
    --exclude='package.json' \
    --exclude='package-lock.json' \
    --exclude='webpack.config.js' \
    --exclude='phpcs.xml' \
    --exclude='prepros.config' \
    --exclude='config.codekit3' \
    --exclude='MIGRATION-NOTES.md' \
    ./ "$BUILD_DIR/"

# Zip the build directory
cd "$DIST_DIR" || exit 1
zip -r "$PLUGIN_SLUG-$VERSION.zip" "$PLUGIN_SLUG"

# Remove the build directory
rm -rfd "$PLUGIN_SLUG"

cd ..

echo "Done: $DIST_DIR/$PLUGIN_SLUG-$VERSION.zip"