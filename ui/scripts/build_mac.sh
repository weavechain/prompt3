#!/bin/bash
electron-packager . "Prompt3" --platform=darwin --arch=x64 --version=0.35.6 --app-bundle-id="com.weavechain.prompt3" --app-version="1.0.0" --build-version="1.0.100" --osx-sign

