import useChessboardContext from "@/app/chessboard/useChessboardContext";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface WinDialogProps {
    open: boolean;
    onOpenChange: () => void;
}

export const WinDialog = ({open, onOpenChange}: WinDialogProps) => {
  const { reset } = useChessboardContext();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Congratulations! 🎉</DialogTitle>
          <DialogDescription>
            You solved the puzzle!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="w-full grid grid-cols-2 gap-4">
            <DialogClose asChild>
              <Button 
                type="button" 
                variant="secondary"
                onClick={reset}
              >
                Reset board
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="button">Return</Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}