import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Settings } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getOllamaModels } from "@/lib/ollama";
import { ModelResponse } from "ollama";
import { changeConversationModel, getConversation } from "@/lib/conversation";
type Props = {
  conversation: Conversation;
};
function ChangeModel({ conversation }: Props) {
  const [models, setModels] = useState<ModelResponse[]>([]);
  useEffect(() => {
    const fetchModels = async () => {
      const allOllamaModels = await getOllamaModels();

      setModels(allOllamaModels.models);
    };
    fetchModels();
  }, []);
  return (
    <Dialog>
      <DialogTrigger>
        <Settings className="cursor-pointer" size={20} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Conversation Setting</DialogTitle>
          <DialogDescription>
            Choose the AI model you want to connect to. You can change the model
            whenever you want.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-3">
          <p className="text-lg font-semibold">Model</p>
          <Select
            onValueChange={(value) =>
              changeConversationModel(conversation.id, value)
            }
          >
            <SelectTrigger className="w-[180px]">
              {conversation.model}
            </SelectTrigger>
            <SelectContent>
              {models.map((model) => (
                <SelectItem key={model.name} value={model.name}>
                  {model.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ChangeModel;
