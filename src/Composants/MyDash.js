import React from 'react';
import CanvasJSReact from'./canvasjs.react';
import API from './API';
let CanvasJS = CanvasJSReact.CanvasJS;
let CanvasJSChart = CanvasJSReact.CanvasJSChart;

let historiqueNet =[];
export default class MyDash extends React.Component{

    constructor(props) {
        super(props);

         this.state = {
             indicateur1:[] ,
            data2: [],
        }

this.getIndicateur1=this.getIndicateur1.bind(this)

    }

    async getIndicateur1 (id,email){
        API.indicateur1(id,email).then(data=>{
          let DataIndicateur1 =    data.data.map((t)=>{
              return {label:  t['nom'],y: t['NbpPhrase']*1}
          })
          this.setState({ indicateur1 : DataIndicateur1,

          });
      });


    }
    componentDidMount() {
       // this.getIndicateur1("999","wadica2@hotmail.fr")
    }

    render() {



        let options = {
            animationEnabled: true,
            exportEnabled: true,
            theme: "light1", // "light1", "dark1", "dark2"
            title:{
                text: "Trip Expenses"
            },
            data: [{
                type: "pie",
                indexLabel: "{label}: {y}%",
                startAngle: -90,
                dataPoints: this.getIndicateur1()
            }]}


        let options2 = {
            animationEnabled: true,
            theme: "light2",
            title:{
                text: "Evolution du score du joueur"
            },
            axisX:{
                valueFormatString: "DD MM YY / HH:mm:ss",
                crosshair: {
                    enabled: true,
                    snapToDataPoint: true
                }
            },
            axisY: {
                title: "Score (in EUR)",
                includeZero: false,
                valueFormatString: "€##0.00",
                crosshair: {
                    enabled: true,
                    snapToDataPoint: true,
                    labelFormatter: function(e) {
                        return "€" + CanvasJS.formatNumber(e.value, "##0.00");
                    }
                }
            },
            data: [{
                type: "area",
                xValueFormatString: "DD MMM",
                yValueFormatString: "€##0.00",
                dataPoints: "",
            }]

        }

        return (
            <div className="stat">


                <div  className="interface">
                    <div className="container">
                        <div>
                            <CanvasJSChart options = {options}
                                           onRef={ref => this.chart = ref}
                            />
                            {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
                        </div>

                        <div>
                            <CanvasJSChart options = {options2}
                                 onRef={ref => this.chart = ref}
                            />
                            {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
                        </div>


                    </div>
                </div>

            </div>

        )
    }
}