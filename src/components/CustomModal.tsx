import { motion, AnimatePresence } from "framer-motion";

export type ModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  children?: React.ReactNode;
};

export const CustomModal = ({ open, setOpen, children }: ModalProps) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed top-0 left-0 w-screen h-screen z-50 flex justify-center items-center"
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="absolute w-full h-full bg-gradient-to-t from-red-500/30 to-transparent backdrop-blur-lg transition-all"
            variants={{
              visible: { opacity: 1, backdropFilter: "blur(5px)" },
              hidden: { opacity: 0, backdropFilter: "blur(0px)" },
            }}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={() => setOpen(false)}
          />

          <motion.div
            className="bg-background border p-5 rounded-lg relative z-50 max-w-[90vw] max-h-[90vh] overflow-scroll"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
              },
            }}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
