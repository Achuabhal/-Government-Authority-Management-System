import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Plus, Minus } from "lucide-react";

export interface DataItem {
  id: string;
  title: string;
  description: string;
  type: "Campaign" | "Assets" | "Income" | "Expense" | "Document";
  status: "Active" | "Completed" | "Pending";
  amount?: number;
  date?: string;
  category?: string;
  group?: string;
  tags: string[];
}

interface DataTableProps {
  items: DataItem[];
  onItemClick?: (item: DataItem) => void;
}

const getTypeColor = (type: string) => {
  switch (type) {
    case "Campaign":
      return "bg-primary text-primary-foreground";
    case "Assets":
      return "bg-info text-info-foreground";
    case "Income":
      return "bg-success text-success-foreground";
    case "Expense":
      return "bg-destructive text-destructive-foreground";
    case "Document":
      return "bg-secondary text-secondary-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-status-active text-white";
    case "Completed":
      return "bg-status-completed text-white";
    case "Pending":
      return "bg-status-pending text-white";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const formatAmount = (amount?: number) => {
  if (!amount) return "-";
  
  const isPositive = amount > 0;
  const formattedAmount = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  }).format(Math.abs(amount));
  
  return (
    <div className={`flex items-center gap-1 font-medium ${isPositive ? 'text-amount-positive' : 'text-amount-negative'}`}>
      {isPositive ? <Plus className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
      {formattedAmount}
    </div>
  );
};

export function DataTable({ items, onItemClick }: DataTableProps) {
  return (
    <div className="w-full space-y-4">
      {/* Desktop Table View */}
      <div className="hidden lg:block">
        <div className="rounded-lg border border-border overflow-hidden bg-card">
          <div className="grid grid-cols-8 gap-4 p-4 bg-muted/50 font-medium text-sm text-muted-foreground border-b border-border">
            <div className="col-span-2">Title & Description</div>
            <div>Type</div>
            <div>Status</div>
            <div>Amount</div>
            <div>Date</div>
            <div>Category/Group</div>
            <div>Tags</div>
          </div>
          
          {items.map((item) => (
            <div key={item.id} className="grid grid-cols-8 gap-4 p-4 border-b border-border last:border-b-0 hover:bg-card-hover transition-colors cursor-pointer" onClick={() => onItemClick?.(item)}>
              <div className="col-span-2">
                <h3 className="font-medium text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
              </div>
              
              <div>
                <Badge variant="secondary" className={getTypeColor(item.type)}>
                  {item.type}
                </Badge>
              </div>
              
              <div>
                <Badge variant="secondary" className={getStatusColor(item.status)}>
                  {item.status}
                </Badge>
              </div>
              
              <div>{formatAmount(item.amount)}</div>
              
              <div className="text-sm text-muted-foreground">
                {item.date || "-"}
              </div>
              
              <div className="text-sm">
                {item.group && (
                  <div className="text-muted-foreground">Group: <span className="text-foreground">{item.group}</span></div>
                )}
                {item.category && (
                  <div className="text-muted-foreground">Category: <span className="text-foreground">{item.category}</span></div>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {item.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-3">
        {items.map((item) => (
          <Card key={item.id} className="p-4 hover:bg-card-hover transition-colors cursor-pointer" onClick={() => onItemClick?.(item)}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground truncate">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 ml-2">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary" className={getTypeColor(item.type)}>
                {item.type}
              </Badge>
              <Badge variant="secondary" className={getStatusColor(item.status)}>
                {item.status}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Amount:</span>
                <div className="mt-1">{formatAmount(item.amount)}</div>
              </div>
              
              <div>
                <span className="text-muted-foreground">Date:</span>
                <div className="mt-1 text-foreground">{item.date || "-"}</div>
              </div>
              
              {(item.group || item.category) && (
                <div className="col-span-2">
                  <span className="text-muted-foreground">Category:</span>
                  <div className="mt-1 text-foreground">
                    {item.group && `Group: ${item.group}`}
                    {item.group && item.category && " • "}
                    {item.category && `Category: ${item.category}`}
                  </div>
                </div>
              )}
              
              {item.tags.length > 0 && (
                <div className="col-span-2">
                  <span className="text-muted-foreground block mb-2">Tags:</span>
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}