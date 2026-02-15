import { Pie, PieChart } from 'recharts';




// #endregion
export default function MyPieChart({data, isAnimationActive = true }) {
  return (
    <PieChart style={{ width: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 1 }} responsive>
      <Pie
        data={data}
        innerRadius="50%"
        outerRadius="60%"
        // Corner radius is the rounded edge of each pie slice
        cornerRadius="0%"
        fill="#8884d8"
        // padding angle is the gap between each pie slice
        paddingAngle={0}
        dataKey="value"

        isAnimationActive={isAnimationActive}
      />

    </PieChart>
  );
}