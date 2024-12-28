// app/dashboard/ListCard.tsx
import React from "react";
import { Card } from "@/components/ui/card"; // Adjust import paths as necessary
import { ScrollArea } from "@/components/ui/scroll-area"; // Adjust import paths as necessary
import { Badge } from "@/components/ui/badge"; // Adjust import paths as necessary

const ListCard = () => (
  <ScrollArea className="h-[500px]">
    <div className="flex flex-col gap-2 pt-0">
      {/* Example Item 1 */}
      <Card className="flex flex-col gap-2 p-3 transition-all hover:bg-accent bg-muted">
        <div className="flex justify-between items-center">
          <div className="font-semibold">William Smith</div>
          <div className="text-xs text-foreground">about 1 year ago</div>
        </div>
        <div className="text-xs font-medium">Meeting Tomorrow</div>
        <div className="line-clamp-2 text-xs text-muted-foreground">
          Hi, let's have a meeting tomorrow to discuss the project. I've been
          reviewing the project details and have some ideas I'd like to share...
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">meeting</Badge>
          <Badge variant="destructive">work</Badge>
          <Badge variant="secondary">important</Badge>
        </div>
      </Card>

      {/* Example Item 2 */}
      <Card className="flex flex-col gap-2 p-3 transition-all hover:bg-accent">
        <div className="flex justify-between items-center">
          <div className="font-semibold">Alice Smith</div>
          <div className="text-xs text-muted-foreground">about 1 year ago</div>
        </div>
        <div className="text-xs font-medium">Re: Project Update</div>
        <div className="line-clamp-2 text-xs text-muted-foreground">
          Thank you for the project update. It looks great! I've gone through
          the report, and the progress is impressive...
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="default">work</Badge>
          <Badge variant="secondary">important</Badge>
        </div>
      </Card>
    </div>
  </ScrollArea>
);

export default ListCard;
