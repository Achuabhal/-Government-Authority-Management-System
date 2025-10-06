import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DataItem } from "./DataTable";

interface AmountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: DataItem | null;
  onSave: (itemId: string, amount: number) => void;
}

export function AmountDialog({ open, onOpenChange, item, onSave }: AmountDialogProps) {
  const [amount, setAmount] = useState<string>(item?.amount?.toString() || "");

  const handleSave = () => {
    if (item && amount) {
      const numericAmount = parseFloat(amount);
      if (!isNaN(numericAmount)) {
        onSave(item.id, numericAmount);
        onOpenChange(false);
      }
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen && item) {
      setAmount(item.amount?.toString() || "");
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-card border border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Edit Amount</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {item ? `Update the amount for "${item.title}"` : ""}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right text-foreground">
              Amount
            </Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="col-span-3 bg-background border-input"
              placeholder="Enter amount"
            />
          </div>
          
          {item && (
            <div className="text-sm text-muted-foreground">
              <p><strong>Type:</strong> {item.type}</p>
              <p><strong>Status:</strong> {item.status}</p>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="border-input"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Save Amount
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}