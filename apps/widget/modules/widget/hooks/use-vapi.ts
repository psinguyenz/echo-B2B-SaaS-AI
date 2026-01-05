import Vapi from "@vapi-ai/web";
import { useEffect, useState } from "react";

interface TranscriptMessage {
    role: "user" | "assistant";
    text: string;
};

export const useVapi = () => {
    const [vapi, setVapi] = useState<Vapi | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);
    // Phan nay giong khai bao bien trong python, voi 2 bien cuoi la dang array

    useEffect(() => {
        const vapiInstance = new Vapi("8a3694f7-0097-44c3-b84b-614bad29e329");
        // only for testing the Vapi API, otherwise customers will provide their own API keys

        setVapi(vapiInstance);

        vapiInstance.on("call-start", () => {
            setIsConnected(true);
            setIsConnecting(false);
            setTranscript([]);
            // similar to state change 
        });

        vapiInstance.on("call-end", () => {
            setIsConnected(false);
            setIsConnecting(false);
            setIsSpeaking(false);
        });

        vapiInstance.on("speech-start", () => {
            setIsSpeaking(true);
        });

        vapiInstance.on("speech-end", () => {
            setIsSpeaking(false);
        });

        vapiInstance.on("error", (error) => {
            console.log(error, "VAPI_ERROR")
            setIsConnecting(false);
        });

        vapiInstance.on("message", (message) => {
            if (message.type === "transcript" && message.transcriptType === "final") {
                setTranscript((prev) => [
                    ...prev,
                    {
                        role: message.role === "user" ? "user" : "assistant",
                        // either be user or change to assistant
                        text: message.transcript,
                    }
                ]);
            };
        });

        return () => {
            vapiInstance?.stop();
        }
    }, []); //give it an empty dependencies array

    const startCall = () => {
        setIsConnecting(true)

        if (vapi) {
            // Only for testing the Vapi API, otherwise customers will provide their own Assistant IDs
            vapi.start("21a281c8-ef5b-4e37-98d8-86086794a143"); // id of Tom
            // if vapi exist
        }
    }

    const endCall = () => {
        if (vapi) {
            vapi.stop();
        }
    };

    return {
        isSpeaking,
        isConnecting,
        isConnected,
        transcript,
        startCall,
        endCall,
    }
}