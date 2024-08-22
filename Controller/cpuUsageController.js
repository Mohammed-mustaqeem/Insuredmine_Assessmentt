import os from 'os';
import exec from 'child_process';


const getCPUUsage = () => {
    const cpus = os.cpus();
  
    let user = 0;
    let nice = 0;
    let sys = 0;
    let idle = 0;
    let irq = 0;
  
    for (let cpu of cpus) {
      user += cpu.times.user;
      nice += cpu.times.nice;
      sys += cpu.times.sys;
      idle += cpu.times.idle;
      irq += cpu.times.irq;
    }
  
    const total = user + nice + sys + idle + irq;
    const used = total - idle;
  
    return (used / total) * 100;
  };
  
  const restartServer = () => {
    console.log('Restarting server due to high CPU usage...');
    exec('pm2 restart your-server-name', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error restarting server: ${error.message}`);
        return;
      }
      console.log(`Server restarted: ${stdout}`);
    });
  };

 export const monitorCPUUsage = () => {
    setInterval(() => {
      const cpuUsage = getCPUUsage();
      console.log(`CPU Usage: ${cpuUsage.toFixed(2)}%`);
  
      if (cpuUsage > 70) {
        restartServer();
      }
    }, 10000);
  };
  