"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatHistoryManager = void 0;
const schema_1 = require("langchain/schema");
class ChatHistoryManager {
    constructor(systemMessage) {
        this.chatHistory = [];
        if (systemMessage) {
            this.addSystemMessage(systemMessage);
        }
    }
    addSystemMessage(message) {
        this.chatHistory.push(new schema_1.SystemMessage(message));
    }
    addAiMessage(message) {
        this.chatHistory.push(new schema_1.AIMessage(message));
    }
    addHumanMessage(message) {
        this.chatHistory.push(new schema_1.HumanMessage(message));
    }
}
exports.ChatHistoryManager = ChatHistoryManager;
//# sourceMappingURL=chat-history-manager.js.map