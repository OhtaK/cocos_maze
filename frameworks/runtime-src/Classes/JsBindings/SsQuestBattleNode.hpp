//
//  SsQuestBattleNode.hpp
//  magic
//
//  Created by 太田敦士 on 2018/03/16.
//
#ifndef _JS_BINDINGS_SS_QUEST_BATTLE_NODE_hpp
#define _JS_BINDINGS_SS_QUEST_BATTLE_NODE_hpp

#include "jsapi.h"
#include "jsfriendapi.h"

extern JSObject *jsb_cocos2d_Node_prototype;
extern JSClass  *jsb_SsQuestBattleNode_class;
extern JSObject *jsb_SsQuestBattleNode_prototype;

void register_all_ss_quest_battle_node(JSContext *cx, JS::HandleObject object);

#endif /* _JS_BINDINGS_SS_QUEST_BATTLE_NODE_hpp */