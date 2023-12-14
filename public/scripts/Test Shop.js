function Show() {
            const container = document.createElement('div');
            // default
            container.style.position = "fixed"
            container.style.zIndex = 1000
            container.style.display = "flex"
            container.style.justifyContent = "center"
            container.style.flexDirection = "column"
            container.style.alignContent = "center"
            container.style.left = "0%"; container.style.top = "0%";            
            
            
            container.innerHTML = `<div style="width: 50px;height: 50px;">
        <a target='__blank' href='https://admin.shopify.com/store/quickstart-fecb20e3/apps/social-boat/app?index=' style="width: 100%;" >
        <img src='https://5a21-2401-4900-1c7a-ed05-25be-d4c2-ce22-1461.ngrok-free.app/image/icon-1702377335162-249400530.svg' alt='custom' style="width: 100%;" />
        </a>
        </div>`
            


            document.body.appendChild(container)
            }
            
            Show()