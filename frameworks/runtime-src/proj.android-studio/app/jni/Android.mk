LOCAL_PATH := $(call my-dir)

include $(CLEAR_VARS)

LOCAL_MODULE    := SPFXEngine
LOCAL_SRC_FILES := ../../../SPFXEngine/Library/android/armeabi-v7a/libSPFXEngineD.a
include $(PREBUILT_STATIC_LIBRARY)

include $(CLEAR_VARS)

LOCAL_MODULE := cocos2djs_shared

LOCAL_MODULE_FILENAME := libcocos2djs

FILE_LIST := $(wildcard $(LOCAL_PATH)/../../../Classes/*.cpp) \
             $(wildcard $(LOCAL_PATH)/../../../Classes/**/*.cpp) \
             $(wildcard $(LOCAL_PATH)/../../../Classes/**/**/*.cpp) \
             $(wildcard $(LOCAL_PATH)/../../../Classes/**/**/**/*.cpp) \
             $(wildcard $(LOCAL_PATH)/../../../Classes/**/**/**/**/*.cpp) \
             $(wildcard $(LOCAL_PATH)/../../../Classes/**/**/**/**/**/*.cpp) \
             $(wildcard $(LOCAL_PATH)/../../../Classes/**/**/**/**/**/**/*.cpp)
LOCAL_SRC_FILES := $(LOCAL_PATH)/hellojavascript/main.cpp
LOCAL_SRC_FILES += $(FILE_LIST:$(LOCAL_PATH)/%=%)

LOCAL_C_INCLUDES := $(LOCAL_PATH)/../../../Classes \
                    $(LOCAL_PATH)/../../../SPFXEngine/include

LOCAL_STATIC_LIBRARIES := cocos2d_js_static
LOCAL_STATIC_LIBRARIES += lwf_static
LOCAL_STATIC_LIBRARIES += SPFXEngine

LOCAL_EXPORT_CFLAGS := -DCOCOS2D_DEBUG=2 -DCOCOS2D_JAVASCRIPT

include $(BUILD_SHARED_LIBRARY)


$(call import-module, scripting/js-bindings/proj.android)
$(call import-module, ../runtime-src/lwf/project.android)