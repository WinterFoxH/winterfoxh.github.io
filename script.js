document.addEventListener('DOMContentLoaded', function() {
    const terminalOutput = document.getElementById('terminal-output');
    const commandInput = document.getElementById('command-input');
    const terminalBox = document.querySelector('.terminal-box');
    const terminalHeader = document.querySelector('.terminal-header');
    
    // Make terminal draggable with boundary checking
    terminalHeader.addEventListener('mousedown', function(e) {
        if (e.button !== 0) return;
        
        e.preventDefault();
        
        const startX = e.clientX;
        const startY = e.clientY;
        const startLeft = terminalBox.offsetLeft;
        const startTop = terminalBox.offsetTop;
        const terminalWidth = terminalBox.offsetWidth;
        const terminalHeight = terminalBox.offsetHeight;

        function moveTerminal(e) {
            let newLeft = Math.max(0, Math.min(
                startLeft + e.clientX - startX, 
                window.innerWidth - terminalWidth
            ));
            let newTop = Math.max(0, Math.min(
                startTop + e.clientY - startY,
                window.innerHeight - terminalHeight
            ));
            
            terminalBox.style.left = `${newLeft}px`;
            terminalBox.style.top = `${newTop}px`;
        }

        function stopMoving() {
            document.removeEventListener('mousemove', moveTerminal);
            document.removeEventListener('mouseup', stopMoving);
        }

        document.addEventListener('mousemove', moveTerminal);
        document.addEventListener('mouseup', stopMoving);
    });

    // Command definitions
    const commands = {
        help: {
            description: "Show this help message",
            execute: () => showHelp()
        },
        whoami: {
            description: "Show about information",
            execute: () => showWhoami()
        },
        'ls tech_stack': {
            description: "List technical skills",
            execute: () => showTechStack()
        },
        'cat contact.txt': {
            description: "Show contact information",
            execute: () => showContact()
        },
        clear: {
            description: "Clear the terminal",
            execute: () => clearTerminal()
        },
        // Secret commands
        rickroll: {
            hidden: true,
            execute: () => {
                window.open('https://shattereddisk.github.io/rickroll/rickroll.mp4', '_blank');
                addToOutput('<div class="command-response">Never gonna give you up...</div>');
            }
        },
tigerdropnegatesalldamage: {
    hidden: true,
    execute: () => {
        // Create image element
        const img = document.createElement('img');
        img.src = 'Tiger_drop.jpg'; // Example tiger image URL
        img.alt = 'Tiger drop negates all damage';
        img.style.position = 'fixed';
        img.style.top = '50%';
        img.style.left = '50%';
        img.style.transform = 'translate(-50%, -50%)';
        img.style.maxWidth = '80vw';
        img.style.maxHeight = '80vh';
        img.style.zIndex = '1000';
        img.style.boxShadow = '0 0 20px rgba(0,0,0,0.8)';
        
        // Create audio element
        const audio = new Audio('tiger-drop-sound-effect-made-with-Voicemod.mp3'); // Example sound URL
        audio.volume = 0.5;
        
        // Add to document
        document.body.appendChild(img);
        
        // Play sound
        audio.play().catch(e => console.log('Audio play failed:', e));
        
        // Remove after 5 seconds
        setTimeout(() => {
            document.body.removeChild(img);
        }, 5000);
        
        addToOutput('<div class="command-response">Tiger drop activated!</div>');
    }
},
        neofetch: {
            hidden: true,
            execute: () => {
                const userAgent = navigator.userAgent;
                const cores = navigator.hardwareConcurrency || 'unknown';
                const memory = navigator.deviceMemory || 'unknown';
                const resolution = `${window.screen.width}x${window.screen.height}`;
                
                addToOutput(`
                    <div class="command-response">
                        <pre class="ascii-art">${getLinuxMintAsciiArt()}</pre>
                        <pre>
<span class="neofetch-title">winterfox@browser</span>
-------------------------------
<b>OS</b>: Linux Mint
<b>Browser</b>: ${getBrowserName()}
<b>Resolution</b>: ${resolution}
<b>CPU Cores</b>: ${cores}
<b>Memory</b>: ${memory} GB
                        </pre>
                    </div>
                `);
            }
        }
    };
    

    // Helper function to detect browser
    function getBrowserName() {
        const userAgent = navigator.userAgent;
        if (userAgent.includes("Firefox")) return "Firefox";
        if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) return "Safari";
        if (userAgent.includes("Chrome")) return "Chrome";
        if (userAgent.includes("Edge")) return "Edge";
        if (userAgent.includes("Opera")) return "Opera";
        return "Unknown";
    }

    // Latest Linux Mint ASCII art with proper color formatting
    function getLinuxMintAsciiArt() {
        return `
<span style="color: #8cc04b}">MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM</span>
<span style="color: #8cc04b}">MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM</span>
<span style="color: #8cc04b}">MM<span style="color: #ffffff}">::::::::::::::::::::::::::::::::::</span>MM</span>
<span style="color: #8cc04b}">MM<span style="color: #ffffff}">::::::::::::::::::::::::::::::::::</span>MM</span>
<span style="color: #8cc04b}">MM<span style="color: #ffffff}">::::::<span style="color: #8cc04b}">MMM<span style="color: #ffffff}">::::::::<span style="color: #8cc04b}">MMM<span style="color: #ffffff}">::::::::</span>MM</span>
<span style="color: #8cc04b}">MM<span style="color: #ffffff}">::::::<span style="color: #8cc04b}">MMMM<span style="color: #ffffff}">::::::<span style="color: #8cc04b}">MMMM<span style="color: #ffffff}">::::::</span>MM</span>
<span style="color: #8cc04b}">MM<span style="color: #ffffff}">::::::<span style="color: #8cc04b}">MMMMM<span style="color: #ffffff}">::::<span style="color: #8cc04b}">MMMMM<span style="color: #ffffff}">::::::</span>MM</span>
<span style="color: #8cc04b}">MM<span style="color: #ffffff}">::::::<span style="color: #8cc04b}">MM<span style="color: #ffffff}">:<span style="color: #8cc04b}">MM<span style="color: #ffffff}">:::<span style="color: #8cc04b}">MM<span style="color: #ffffff}">:<span style="color: #8cc04b}">MM<span style="color: #ffffff}">::::::</span>MM</span>
<span style="color: #8cc04b}">MM<span style="color: #ffffff}">::::::<span style="color: #8cc04b}">MM<span style="color: #ffffff}">::<span style="color: #8cc04b}">MM<span style="color: #ffffff}">:<span style="color: #8cc04b}">MM<span style="color: #ffffff}">::<span style="color: #8cc04b}">MM<span style="color: #ffffff}">::::::</span>MM</span>
<span style="color: #8cc04b}">MM<span style="color: #ffffff}">::::::<span style="color: #8cc04b}">MM<span style="color: #ffffff}">:::<span style="color: #8cc04b}">MMMMM<span style="color: #ffffff}">::::::</span>MM</span>
<span style="color: #8cc04b}">MM<span style="color: #ffffff}">::::::<span style="color: #8cc04b}">MM<span style="color: #ffffff}">::::<span style="color: #8cc04b}">MMM<span style="color: #ffffff}">:::::::</span>MM</span>
<span style="color: #8cc04b}">MM<span style="color: #ffffff}">::::::::::::::::::::::::::::::::::</span>MM</span>
<span style="color: #8cc04b}">MM<span style="color: #ffffff}">::::::::::::::::::::::::::::::::::</span>MM</span>
<span style="color: #8cc04b}">MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM</span>
<span style="color: #8cc04b}">MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM</span>
`.trim();
    }

    // Focus input automatically
    commandInput.focus();

    // Handle command input
    commandInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const input = this.value.trim();
            this.value = '';
            
            addToOutput(`<span class="prompt">$</span> ${input}`);
            
            const parts = input.split(/\s+/);
            const command = parts[0] + (parts[1] ? ` ${parts[1]}` : '');
            
            if (commands[command]) {
                commands[command].execute();
            } else if (input) {
                addToOutput(`<div class="command-response">Command not found: ${input}</div>`);
            }
            
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }
    });

    function addToOutput(content) {
        const div = document.createElement('div');
        div.innerHTML = content;
        terminalOutput.appendChild(div);
    }

    function showHelp() {
        let helpText = '<div class="command-response">';
        helpText += '<p>Available commands:</p>';
        for (const [cmd, info] of Object.entries(commands)) {
            if (!info.hidden) {
                helpText += `<p class="command-help">${cmd.padEnd(15)} - ${info.description}</p>`;
            }
        }
        helpText += '</div>';
        addToOutput(helpText);
    }

    function showWhoami() {
        const response = `
            <div class="command-response">
                <p>Creative Developer & Cybersecurity Enthusiast</p>
                <p>Specializing in interactive experiences</p>
            </div>
        `;
        addToOutput(response);
    }

    function showTechStack() {
        const response = `
            <div class="command-response">
                <p>JavaScript/Node.js</p>
                <p>Python</p>
                <p>Unity</p>
                <p>Data Bases</p>
                <p>Networking</p>
            </div>
        `;
        addToOutput(response);
    }

    function showContact() {
        const response = `
            <div class="command-response">
                <p>email: oleksandrfilenkov@gmail.com</p>
                <p>github: @WinterFoxH</p>
            </div>
        `;
        addToOutput(response);
    }

    function clearTerminal() {
        terminalOutput.innerHTML = '<div class="welcome-message"><p>Terminal cleared</p></div>';
    }
});
