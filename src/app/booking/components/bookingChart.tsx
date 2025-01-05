// app/dashboard/ChartCard.tsx
import React, { useEffect, useState } from 'react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'; // Adjust import paths as necessary
import { LineChart, Line, CartesianGrid, XAxis } from 'recharts'; // Ensure recharts is installed
import { useApiContext } from '@/context/apiContext';

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

const BookingChart = () => {
  const { bookingData } = useApiContext();
  const [combinedChartData, setCombinedChartData] = useState([]);

  // Function to transform and combine data
  const transformAndCombineData = (data) => {
    const monthlyCounts = {};

    // Transform bookingData into monthly counts
    data.forEach((item) => {
      const date = new Date(item.created_at);
      const month = date.toLocaleString('default', { month: 'long' });
      monthlyCounts[month] = (monthlyCounts[month] || 0) + 1;
    });

    // Create an array of months for the chart
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    // Combine with existing chart data structure
    return months.map((month) => ({
      month,
      dataCount: monthlyCounts[month] || 0,
    }));
  };

  // Use effect to detect changes in bookingData and update combinedChartData
  useEffect(() => {
    if (bookingData?.length > 0) {
      const updatedChartData = transformAndCombineData(bookingData);
      setCombinedChartData(updatedChartData);
    }
  }, [bookingData]); // Dependency array includes bookingData

  return (
    <ChartContainer config={chartConfig}>
      <LineChart
        accessibilityLayer
        data={combinedChartData} // Use combined chart data here
        margin={{ left: 12, right: 12 }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Line
          dataKey="dataCount" // Update to match the new data structure
          type="natural"
          stroke="var(--color-desktop)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
};

export default BookingChart;
