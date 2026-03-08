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

interface LoseDialogProps {
    open: boolean;
    onOpenChange: () => void;
}

export const LoseDialog = ({open, onOpenChange}: LoseDialogProps) => {
  const { reset } = useChessboardContext();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Sorry!</DialogTitle>
          <DialogDescription>
            That's not a valid solution. Would you like to try again?
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
                Reset Board
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="button">Retry</Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
