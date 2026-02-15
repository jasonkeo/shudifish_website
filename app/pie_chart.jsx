import { Pie, PieChart } from 'recharts';




// #endregion
export default function MyPieChart({data, isAnimationActive = true }) {
  return (
    <PieChart style={{ width: '100%', maxWidth: '250px', maxHeight: '80vh', aspectRatio: 1 , marginLeft: 'auto',   // center horizontally
    marginRight: 'auto',  // required for auto centering
    display: 'block',}} responsive>
      <Pie
        data={data}
        innerRadius="80%"
        outerRadius="90%"
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