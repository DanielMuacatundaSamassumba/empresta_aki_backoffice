import { UseDarkMode } from "@/context/ThemeProvider";
import { Chart } from "react-google-charts";


export function ChartResume({ data, title }: any) {
    const themeContext = UseDarkMode()

    const { darkMode } = themeContext || { darkMode: false, setDarkMode: () => { } }
    const option = {
        title: title,
        backgroundColor: darkMode ? "#18181b" : "#ffffff", // fundo do gráfico
        titleTextStyle: {
            color: darkMode ? "#ffffff" : "#000000",
        },
        hAxis: {
            textStyle: { color: darkMode ? "#ffffff" : "#000000" },
        },
        vAxis: {
            textStyle: { color: darkMode ? "#ffffff" : "#000000" },
        },
        legend: {
            textStyle: { color: darkMode ? "#ffffff" : "#000000" },
        },
    }
    return (
        <div  >
            <Chart
                chartType="ColumnChart"
                width="100%"
                height="100%"
                data={data}
                options={option}
            />
        </div>
    );
}
