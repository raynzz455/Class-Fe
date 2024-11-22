import React from 'react';
import { Button } from "@/components/ui/button";

interface ModalProps {
    isVisible: boolean;
    title: string;
    children: React.ReactNode;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isVisible, title, children, onClose }) => {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg overflow-hidden shadow-xl w-1/3">
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-lg font-medium">{title}</h3>
                    <Button variant="outline" onClick={onClose}>Close</Button>
                </div>
                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
