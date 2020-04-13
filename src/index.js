import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

  
class Pendulum extends React.Component {
  
    render() {
      return (
        <rect>

        </rect>
      );
    }
  }
  
class Simulation extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            theta_1: -80 * Math.PI / 180,
            theta_2: -60 * Math.PI / 180,
            omega_1: 0,
            omega_2: 0,
            theta_2_path: [],
            E: 0,
        };
    }

    componentDidMount() {
        this.draw()
    }
     
    componentWillUnmount() {
    }


    draw() {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");
        const l1 = 90;
        const l2 = 120;
        const dt = 1/10;
        const m1 = 70;
        const m2 = 80;
        const g = 9.81;
        const E_tol = 100000;

        var E = this.state.E;
        if (E === 0) {
            E = -g * ((m1 / 2 + m2) * l1* Math.cos(this.state.theta_1) + m2*l2/2*Math.cos(this.state.theta_2));
        } else {
            const E_calc = calcE(this.state.omega_1, this.state.omega_2, this.state.theta_1, this.state.theta_2, l1, l2, m1, m2, g);
            console.log("E_calc is: " + E_calc);
            const E_diff = Math.abs(E_calc - this.state.E);
            // console.log("E_diff is: " + E_diff);
            if (E_diff > E_tol) {
                // window.alert('E differential is' + E);
            }
        }
        const theta_path = this.state.theta_2_path;

        //[omega_1, theta_1, omega_2, theta_2]
        const angles = calcRK(this.state.omega_1, this.state.theta_1, this.state.omega_2, this.state.theta_2, dt, m1, m2, l1, l2, g);
        ctx.clearRect(0, 0, 2000, 2000);
        ctx.translate( canvas.width/2, canvas.height / 2 );
        ctx.rotate( angles[1]);
        drawRectangle(l1, m1, ctx);
        // ctx.rotate( -angles[1]);


        ctx.translate(0, l1 - 3);
        ctx.rotate( angles[3] - angles[1] );
        drawRectangle(l2, m2, ctx);
        ctx.rotate( -angles[3] + angles[1]);
        ctx.translate(0, -l1 + 3);
        ctx.rotate(-angles[1]);
        // ctx.translate( l1 * Math.sin(angles[1]),  - l1 * Math.cos(angles[1]));

        ctx.translate( -canvas.width/2, -canvas.height / 2 )

        this.setState({
            theta_1: angles[1],
            theta_2: angles[3],
            omega_1: angles[0],
            omega_2: angles[2],
            theta_2_path: theta_path.concat(angles[3]),
            E: E,
        });

        requestAnimationFrame(this.draw.bind(this))

    }

    render() {
        return(
            <div>
                <canvas ref="canvas"
                width={700} height={700} />
            </div>
        )
    }
}

function drawRectangle(l, m, ctx) {
    const w = m/10;
    ctx.fillStyle = 'black';
    ctx.fillRect(-w/2, 0, w, l);
    ctx.beginPath();
    ctx.arc(0,0,3,0*Math.PI,2*Math.PI)
    ctx.fillStyle = 'blue';
    ctx.fill();

    return 
}

function calcE(omega_1, omega_2, theta_1, theta_2, l1, l2, m1, m2, g) {
    const cosD = Math.cos(theta_2 - theta_1);
    return (m1/6 + m2/2)*(l1*l1)*omega_1*omega_1 + m2/6*(l2*l2)*omega_2*omega_2 + m2/2*l1*l2*cosD*omega_1 *omega_2 - g * ((m1 / 2 + m2) * l1* Math.cos(theta_1) + m2*l2/2*Math.cos(theta_2));
}

function calcRK(omega_1, theta_1, omega_2, theta_2, h, m1, m2, l1, l2, g) {

    const a_omega_1 = omega_1_dot(m1, m2, theta_1, theta_2, omega_1, omega_2, l1, l2, g);
    const a_theta_1 = omega_1;
    const a_omega_2 = omega_2_dot(m1, m2, theta_1, theta_2, omega_1, omega_2, l1, l2, g);
    const a_theta_2 = omega_2;

    let temp_theta_1 = theta_1 + 0.5 * h * a_theta_1;
    let temp_omega_1 = omega_1 + 0.5 * h * a_omega_1;
    let temp_theta_2 = theta_2 + 0.5 * h * a_theta_2;
    let temp_omega_2 = omega_2 + 0.5 * h * a_omega_2;

    const b_omega_1 = omega_1_dot(m1, m2, temp_theta_1, temp_theta_2, temp_omega_1, temp_omega_2, l1, l2, g);
    const b_theta_1 = temp_omega_1;
    const b_omega_2 = omega_2_dot(m1, m2, temp_theta_1, temp_theta_2, temp_omega_1, temp_omega_2, l1, l2, g);
    const b_theta_2 = temp_omega_2;

    temp_theta_1 = theta_1 + 0.5 * h * b_theta_1;
    temp_omega_1 = omega_1 + 0.5 * h * b_omega_1;
    temp_theta_2 = theta_2 + 0.5 * h * b_theta_2;
    temp_omega_2 = omega_2 + 0.5 * h * b_omega_2;

    const c_omega_1 = omega_1_dot(m1, m2, temp_theta_1, temp_theta_2, temp_omega_1, temp_omega_2, l1, l2, g);
    const c_theta_1 = omega_1 + 0.5 * h * b_omega_1;
    const c_omega_2 = omega_2_dot(m1, m2, temp_theta_1, temp_theta_2, temp_omega_1, temp_omega_2, l1, l2, g);
    const c_theta_2 = omega_2 + 0.5 * h * b_omega_2;

    temp_theta_1 = theta_1 + h * c_theta_1;
    temp_omega_1 = omega_1 + h * c_omega_1;
    temp_theta_2 = theta_2 + h * c_theta_2;
    temp_omega_2 = omega_2 + h * c_omega_2;

    const d_omega_1 = omega_1_dot(m1, m2, temp_theta_1, temp_theta_2, temp_omega_1, temp_omega_2, l1, l2, g);
    const d_theta_1 = omega_1 + h * c_omega_1;
    const d_omega_2 = omega_2_dot(m1, m2, temp_theta_1, temp_theta_2, temp_omega_1, temp_omega_2, l1, l2, g);
    const d_theta_2 = omega_2 + h * c_omega_2;

    const calc_omega_1 = omega_1 + (h / 6) * (a_omega_1 + 2 * b_omega_1 + 2 * c_omega_1 + d_omega_1);
    const calc_theta_1 = theta_1 + (h / 6) * (a_theta_1 + 2 * b_theta_1 + 2 * c_theta_1 + d_theta_1);
    const calc_omega_2 = omega_2 + (h / 6) * (a_omega_2 + 2 * b_omega_2 + 2 * c_omega_2 + d_omega_2);
    const calc_theta_2 = theta_2 + (h / 6) * (a_theta_2 + 2 * b_theta_2 + 2 * c_theta_2 + d_theta_2);

    return [calc_omega_1, calc_theta_1, calc_omega_2, calc_theta_2]
}

function omega_1_dot(m1, m2, theta_1, theta_2, omega_1, omega_2, l1, l2, g) {
    const delta = theta_2 - theta_1;
    const cosD = Math.cos(delta);
    const sinD = Math.sin(delta);
    const sin_t1 = Math.sin(theta_1);
    const sin_t2 = Math.sin(theta_2);

    const num = 3  * (2*l2*m2*sinD*omega_2*omega_2 + 3*l1*m2*cosD*sinD*omega_1*omega_1 - g*sin_t1*(2*m1 + 4*m2) + 3*g*m2*cosD*sin_t2);
    const denom = l1 * (4*m1 + 12 * m2 - 9 * cosD * cosD);

    // const mu = 1 + (m1/m2);
    // const num = g * (Math.sin(theta_2) * Math.cos(delta) - mu * Math.sin(theta_1)) - 
    //     Math.sin(delta) * (l2*omega_2*omega_2 + l1*omega_1*omega_1* Math.cos(delta));

    // const denom = l1 * (mu - Math.cos(delta)* Math.cos(delta));

    return num / denom;

}

function omega_2_dot(m1, m2, theta_1, theta_2, omega_1, omega_2, l1, l2, g) {
    const delta = theta_2 - theta_1;
    const cosD = Math.cos(delta);
    const sinD = Math.sin(delta);
    const sin_t1 = Math.sin(theta_1);
    const sin_t2 = Math.sin(theta_2);

    const num = -3  * (-3*g*m1*cosD*sin_t1 + g*sin_t2*(6*m2 + 2*m1) - 6*g*m2*cosD*sin_t1 + l1*sinD*omega_1*omega_1*(2*m1 + 6*m2) + 3*l2*m2*cosD*sinD*omega_2*omega_2);
    const denom = l2 * (4*m1 + 12 * m2 - 9 * cosD * cosD);

    // const mu = 1 + (m1/m2);
    // const num = g * mu * (Math.sin(theta_1) * Math.cos(delta) -  Math.sin(theta_2)) + 
    //     Math.sin(delta) * (mu*l1*omega_1*omega_1 + l2*omega_2*omega_2* Math.cos(delta));

    // const denom = l2 * (mu - Math.cos(delta)* Math.cos(delta));

    return num / denom;

}
  
  // ========================================
  
  ReactDOM.render(
    <Simulation />,
    document.getElementById('root')
  );