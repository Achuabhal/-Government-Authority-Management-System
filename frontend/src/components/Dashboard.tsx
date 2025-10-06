import { useState } from "react";
import { DataTable, DataItem } from "./DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AmountDialog } from "./AmountDialog";

const sampleData: DataItem[] = [
  {
    id: "1",
    title: "Q3 Campaigns",
    description: "Marketing campaigns for Q3 quarter including social media, email campaigns, and brand awareness initiatives",
    type: "Campaign",
    status: "Active",
    date: "-",
    tags: []
  },
  {
    id: "2",
    title: "Brand Assets",
    description: "Complete brand identity package including logos, color schemes, typography guidelines, and brand voice documentation",
    type: "Assets",
    status: "Completed",
    category: "Design",
    tags: []
  },
  {
    id: "3",
    title: "Monthly Salary",
    description: "Regular monthly salary payment for August 2024",
    type: "Income",
    status: "Completed",
    amount: 50000,
    date: "10 Aug 2024",
    group: "Personal",
    tags: ["Regular Income", "Salary"]
  },
  {
    id: "4",
    title: "Office Supplies",
    description: "Monthly purchase of stationery, equipment, and other office essentials for team productivity",
    type: "Expense",
    status: "Completed",
    amount: -2500,
    date: "08 Aug 2024",
    group: "Business",
    category: "Operations",
    tags: ["Office Expense"]
  },
  {
    id: "5",
    title: "Project Documentation",
    description: "Technical documentation and user guides for the new project implementation",
    type: "Document",
    status: "Pending",
    category: "Documentation",
    tags: []
  }
];

export function Dashboard() {
  const [data, setData] = useState<DataItem[]>(sampleData);
  const [selectedItem, setSelectedItem] = useState<DataItem | null>(null);
  const [isAmountDialogOpen, setIsAmountDialogOpen] = useState(false);

  const handleItemClick = (item: DataItem) => {
    setSelectedItem(item);
    setIsAmountDialogOpen(true);
  };

  const handleSaveAmount = (itemId: string, amount: number) => {
    setData(prev => prev.map(item => 
      item.id === itemId ? { ...item, amount } : item
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 max-w-7xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Project Dashboard</h1>
              <p className="text-muted-foreground">
                Manage your campaigns, assets, finances, and documentation in one place
              </p>
            </div>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Entry
            </Button>
          </div>
        </div>
        
        <DataTable items={data} onItemClick={handleItemClick} />
        
        <AmountDialog
          open={isAmountDialogOpen}
          onOpenChange={setIsAmountDialogOpen}
          item={selectedItem}
          onSave={handleSaveAmount}
        />
      </div>
    </div>
  );
}