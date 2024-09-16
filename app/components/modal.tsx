import { HTMLAttributes } from 'react';
import Modal from '@mui/material/Modal';

export default function BaseModal({
    className,
    children,
    open,
    handleClose
}: {
    children: React.ReactNode;
    open: boolean;
    handleClose: () => void;
    className?: HTMLAttributes<HTMLDivElement>["className"];
}) {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            className='justify-center items-center flex'
        >
            <div className={`border-orange-300 border md:w-2/3 md:h-2/3 rounded-md p-5 bg-orange-200 ${className}`}>
                {children}
            </div>
        </Modal>
    );
}