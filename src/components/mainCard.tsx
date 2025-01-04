// app/components/MainCard.tsx
import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'; // Adjust import paths as necessary
import { TrendingUp } from 'lucide-react'; // Ensure lucide-react is installed

const MainCard = ({
  title,
  description,
  children,
  showHeader = true,
  showFooter = false,
  rightView,
}) => (
  <Card>
    {showHeader && (
      <CardHeader>
        <div className="flex justify-between items-end mb-3">
          <div>
            <CardTitle>{title}</CardTitle>
          </div>
          {rightView}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    )}
    <CardContent>
      {children} {/* Render children passed to the card */}
    </CardContent>
    {showFooter && ( // Conditionally render the footer
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    )}
  </Card>
);

export default MainCard;
