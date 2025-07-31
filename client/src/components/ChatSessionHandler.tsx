import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { RotateCcw, MessageCircle } from "lucide-react";

interface ChatSessionHandlerProps {
  isOpen: boolean;
  onClose: () => void;
  onStartNewSession: () => void;
}

const ChatSessionHandler: React.FC<ChatSessionHandlerProps> = ({ 
  isOpen, 
  onClose, 
  onStartNewSession 
}) => {
  const handleNewSession = () => {
    onStartNewSession();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-xl">
            <MessageCircle className="h-6 w-6 text-amber-600" />
            <span>Chat Session Expired</span>
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Your chat session has expired due to inactivity. Would you like to start a new session?
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col space-y-3 mt-6">
          <Button 
            onClick={handleNewSession}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Start New Session
          </Button>
          
          <Button 
            variant="outline" 
            onClick={onClose}
            className="w-full"
          >
            Continue Without Chat
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatSessionHandler;