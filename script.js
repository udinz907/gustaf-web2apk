        document.addEventListener('DOMContentLoaded', function() {
            const loginModal = document.getElementById('loginModal');
            const loginForm = document.getElementById('loginForm');
            const mainContent = document.getElementById('mainContent');
            
            // Default credentials
            const validUsername = 'admin';
            const validPassword = 'password123';
            
            // Check if user is already logged in
            if (localStorage.getItem('isLoggedIn') === 'true') {
                loginModal.style.display = 'none';
                mainContent.style.display = 'block';
            } else {
                loginModal.style.display = 'flex';
                mainContent.style.display = 'none';
            }
            
            // Handle login form submission
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;
                
                if (username === validUsername && password === validPassword) {
                    // Successful login
                    localStorage.setItem('isLoggedIn', 'true');
                    loginModal.style.display = 'none';
                    mainContent.style.display = 'block';
                } else {
                    alert('Username atau password salah! Silakan coba lagi.\n\nDefault: admin / password123');
                }
            });
        });

        // Initialize particles.js
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: window.innerWidth < 768 ? 50 : 100,
                    density: { enable: true, value_area: 800 }
                },
                color: { value: '#ffffff' },
                shape: { type: 'circle' },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#ffffff',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'grab' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                },
                modes: {
                    grab: { distance: 200, line_linked: { opacity: 0.7 } },
                    push: { particles_nb: 4 }
                }
            },
            retina_detect: true
        });

        // Konfigurasi API AppMaker
        const appmakerAPI = {
            baseURL: 'https://standalone-app-api.appmaker.xyz/webapp',
            defaultHeaders: {
                'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36',
                'Accept': 'application/json, text/plain, */*',
                'Accept-Encoding': 'gzip, deflate, br, zstd',
                'sec-ch-ua-platform': '"Android"',
                'sec-ch-ua': '"Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"',
                'dnt': '1',
                'sec-ch-ua-mobile': '?1',
                'origin': 'https://create.appmaker.xyz',
                'sec-fetch-site': 'same-site',
                'sec-fetch-mode': 'cors',
                'sec-fetch-dest': 'empty',
                'referer': 'https://create.appmaker.xyz/',
                'accept-language': 'id,en-US;q=0.9,en;q=0.8,ja;q=0.7',
                'priority': 'u=1, i'
            },
            async createApp(url, email) {
                try {
                    const data = JSON.stringify({ url, email });
                    const response = await axios.post(`${this.baseURL}/build`, data, {
                        headers: {
                            ...this.defaultHeaders,
                            'Content-Type': 'application/json'
                        }
                    });
                    return response.data;
                } catch (error) {
                    console.error('Error creating app:', error);
                    throw error;
                }
            },
            async uploadFile(file, appId) {
                try {
                    const formData = new FormData();
                    formData.append('file', file);
                    formData.append('id', appId);
                    const response = await axios.post(`${this.baseURL}/build/file-upload`, formData, {
                        headers: this.defaultHeaders
                    });
                    return response.data;
                } catch (error) {
                    console.error('Error uploading file:', error);
                    throw error;
                }
            },
            async buildApp(appConfig) {
                try {
                    const data = JSON.stringify(appConfig);
                    const response = await axios.post(`${this.baseURL}/build/build`, data, {
                        headers: {
                            ...this.defaultHeaders,
                            'Content-Type': 'application/json'
                        }
                    });
                    return response.data;
                } catch (error) {
                    console.error('Error building app:', error);
                    throw error;
                }
            },
            async checkStatus(appId) {
                try {
                    const response = await axios.get(`${this.baseURL}/build/status?appId=${appId}`, {
                        headers: {
                            ...this.defaultHeaders,
                            'if-none-match': 'W/"16f-VVclKRvUNSgEIOI1Ys1wn2XnTxM"'
                        }
                    });
                    return response.data;
                } catch (error) {
                    console.error('Error checking status:', error);
                    throw error;
                }
            },
            async getDownloadUrl(appId) {
                try {
                    const response = await axios.get(`${this.baseURL}/complete/download?appId=${appId}`, {
                        headers: this.defaultHeaders
                    });
                    return response.data;
                } catch (error) {
                    console.error('Error getting download URL:', error);
                    throw error;
                }
            }
        };

        document.addEventListener('DOMContentLoaded', function() {
            const themeSwitch = document.getElementById('themeSwitch');
            const themeIcon = themeSwitch.querySelector('i');
            if (localStorage.getItem('theme') === 'dark' || 
                (window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('theme'))) {
                document.body.classList.add('dark-mode');
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
            themeSwitch.addEventListener('click', function() {
                document.body.classList.toggle('dark-mode');
                if (document.body.classList.contains('dark-mode')) {
                    localStorage.setItem('theme', 'dark');
                    themeIcon.classList.remove('fa-moon');
                    themeIcon.classList.add('fa-sun');
                } else {
                    localStorage.setItem('theme', 'light');
                    themeIcon.classList.remove('fa-sun');
                    themeIcon.classList.add('fa-moon');
                }
            });
            const toolbarColor = document.getElementById('toolbarColor');
            const toolbarColorText = document.getElementById('toolbarColorText');
            const toolbarTitleColor = document.getElementById('toolbarTitleColor');
            const toolbarTitleColorText = document.getElementById('toolbarTitleColorText');
            toolbarColor.addEventListener('input', function() {
                toolbarColorText.value = this.value;
            });
            toolbarColorText.addEventListener('input', function() {
                toolbarColor.value = this.value;
            });
            toolbarTitleColor.addEventListener('input', function() {
                toolbarTitleColorText.value = this.value;
            });
            toolbarTitleColorText.addEventListener('input', function() {
                toolbarTitleColor.value = this.value;
            });
            const appIcon = document.getElementById('appIcon');
            const appIconPreview = document.getElementById('appIconPreview');
            const splashIcon = document.getElementById('splashIcon');
            const splashIconPreview = document.getElementById('splashIconPreview');
            appIcon.addEventListener('change', function() {
                const file = this.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        appIconPreview.src = e.target.result;
                        appIconPreview.style.display = 'block';
                    }
                    reader.readAsDataURL(file);
                }
            });
            splashIcon.addEventListener('change', function() {
                const file = this.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        splashIconPreview.src = e.target.result;
                        splashIconPreview.style.display = 'block';
                    }
                    reader.readAsDataURL(file);
                }
            });
            const form = document.getElementById('appForm');
            const progressContainer = document.getElementById('progressContainer');
            const progress = document.getElementById('progress');
            const progressText = document.getElementById('progressText');
            const result = document.getElementById('result');
            form.addEventListener('submit', async function(e) {
                e.preventDefault();
                progressContainer.style.display = 'block';
                result.style.display = 'none';
                const url = document.getElementById('url').value;
                const email = document.getElementById('email').value;
                const appName = document.getElementById('appName').value;
                const packageName = document.getElementById('packageName').value;
                const toolbarColor = document.getElementById('toolbarColor').value;
                const toolbarTitleColor = document.getElementById('toolbarTitleColor').value;
                const enableShowToolBar = document.getElementById('enableShowToolBar').checked;
                const appIconFile = document.getElementById('appIcon').files[0];
                const splashIconFile = document.getElementById('splashIcon').files[0];
                try {
                    progress.style.width = '10%';
                    progressText.textContent = 'Membuat aplikasi...';
                    const createResult = await appmakerAPI.createApp(url, email);
                    const appId = createResult.body.appId;
                    progress.style.width = '30%';
                    progressText.textContent = 'Mengupload icon aplikasi...';
                    const iconUpload = await appmakerAPI.uploadFile(appIconFile, appId);
                    const appIconUrl = iconUpload.cloudStoragePublicUrl;
                    progress.style.width = '50%';
                    progressText.textContent = 'Mengupload splash screen...';
                    const splashUpload = await appmakerAPI.uploadFile(splashIconFile, appId);
                    const splashIconUrl = splashUpload.cloudStoragePublicUrl;
                    progress.style.width = '70%';
                    progressText.textContent = 'Membangun aplikasi...';
                    const appConfig = {
                        appId: appId,
                        appIcon: appIconUrl,
                        appName: appName,
                        isPaymentInProgress: false,
                        enableShowToolBar: enableShowToolBar,
                        toolbarColor: toolbarColor,
                        toolbarTitleColor: toolbarTitleColor,
                        splashIcon: splashIconUrl,
                        packageName: packageName
                    };
                    const buildResult = await appmakerAPI.buildApp(appConfig);
                    progress.style.width = '80%';
                    progressText.textContent = 'Memeriksa status build...';
                    let status;
                    let attempts = 0;
                    const maxAttempts = 30;
                    do {
                        await new Promise(resolve => setTimeout(resolve, 10000));
                        status = await appmakerAPI.checkStatus(appId);
                        attempts++;
                        progress.style.width = 80 + (attempts * 0.66) + '%';
                        progressText.textContent = `Memeriksa status build... (${attempts}/${maxAttempts})`;
                        if (status.body.status === 'success') {
                            break;
                        } else if (status.body.status === 'failed') {
                            throw new Error('App build failed');
                        }
                    } while (attempts < maxAttempts && status.body.status !== 'success');
                    if (attempts >= maxAttempts) {
                        throw new Error('Build timeout - exceeded maximum wait time');
                    }
                    progress.style.width = '95%';
                    progressText.textContent = 'Mendapatkan informasi download...';
                    const downloadInfo = await appmakerAPI.getDownloadUrl(appId);
                    progress.style.width = '100%';
                    progressText.textContent = 'Selesai!';
                    setTimeout(() => {
                        result.className = 'result success';
                        result.innerHTML = `
                            <h3>Aplikasi Berhasil Dibuat!</h3>
                            <p>Aplikasi "${downloadInfo.body.appName}" telah berhasil dibuat dan siap untuk diunduh.</p>
                            <div class="key-info">
                                <h4>Informasi Keystore (Simpan dengan Aman):</h4>
                                <p><strong>Store Password:</strong> ${downloadInfo.body.storePass}</p>
                                <p><strong>Key Password:</strong> ${downloadInfo.body.keyPass}</p>
                                <p><strong>Key SHA:</strong> ${downloadInfo.body.keySha}</p>
                            </div>
                            <div style="margin-top: 1.5rem;">
                                <button class="download-btn" onclick="downloadFile('${downloadInfo.body.buildFile}', '${downloadInfo.body.appName}.apk')">
                                    <i class="fas fa-download"></i> Download APK
                                </button>
                                <button class="download-btn" onclick="downloadFile('${downloadInfo.body.aabFile}', '${downloadInfo.body.appName}.aab')" style="background: var(--accent);">
                                    <i class="fas fa-download"></i> Download AAB
                                </button>
                                <button class="download-btn" onclick="downloadFile('${downloadInfo.body.keyFile}', '${downloadInfo.body.appName}.jks')" style="background: var(--warning);">
                                    <i class="fas fa-key"></i> Download Key
                                </button>
                            </div>
                            <p style="margin-top: 1.5rem; font-size: 0.9rem;">
                                Simpan informasi keystore dengan aman untuk update aplikasi di masa depan.
                            </p>
                        `;
                        result.style.display = 'block';
                        result.scrollIntoView({ behavior: 'smooth' });
                    }, 1000);
                } catch (error) {
                    console.error('Error in app creation:', error);
                    progressContainer.style.display = 'none';
                    result.className = 'result error';
                    result.innerHTML = `
                        <h3>Terjadi Kesalahan</h3>
                        <p>${error.message || 'Proses pembuatan aplikasi gagal. Silakan coba lagi.'}</p>
                        <button class="btn" onclick="location.reload()" style="margin-top: 1rem;">Coba Lagi</button>
                    `;
                    result.style.display = 'block';
                }
            });
            const animatedElements = document.querySelectorAll('.animated');
            animatedElements.forEach(el => {
                el.style.opacity = '0';
            });
            setTimeout(() => {
                animatedElements.forEach(el => {
                    el.style.opacity = '1';
                });
            }, 100);
        });

        function downloadFile(url, filename) {
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }