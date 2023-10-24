Search.setIndex({"docnames": ["docs/010/010intro", "docs/020/020installation", "docs/030/030update", "docs/030/031deploy", "docs/040/040postgres", "docs/040/0410expgltf", "docs/040/0411maintain", "docs/040/041particle", "docs/040/042python", "docs/040/043citydb", "docs/040/044import_citygml", "docs/040/045grafana", "docs/040/046cesium3d", "docs/040/047analysis", "docs/040/048ssl_cert", "docs/040/049wfs", "docs/050/050integration", "docs/050/0510cesiumjs", "docs/050/051docker_image", "docs/050/052webhooks", "docs/050/053integrate3", "docs/050/054containerize", "docs/050/055grafana", "docs/050/056nginx", "docs/050/057replicate", "docs/050/058auth", "docs/050/059bimserver"], "filenames": ["docs/010/010intro.md", "docs/020/020installation.md", "docs/030/030update.md", "docs/030/031deploy.md", "docs/040/040postgres.md", "docs/040/0410expgltf.md", "docs/040/0411maintain.md", "docs/040/041particle.md", "docs/040/042python.md", "docs/040/043citydb.md", "docs/040/044import_citygml.md", "docs/040/045grafana.md", "docs/040/046cesium3d.md", "docs/040/047analysis.md", "docs/040/048ssl_cert.md", "docs/040/049wfs.md", "docs/050/050integration.md", "docs/050/0510cesiumjs.md", "docs/050/051docker_image.md", "docs/050/052webhooks.md", "docs/050/053integrate3.md", "docs/050/054containerize.md", "docs/050/055grafana.md", "docs/050/056nginx.md", "docs/050/057replicate.md", "docs/050/058auth.md", "docs/050/059bimserver.md"], "titles": ["Introduction to Yun2Infinity", "<span class=\"section-number\">1. </span>Installation", "<span class=\"section-number\">1. </span>Update all the container images", "<span class=\"section-number\">2. </span>Deploy to AWS server with a wix subdomain", "<span class=\"section-number\">1. </span>PostgreSQL", "<span class=\"section-number\">11. </span>Export glTF", "<span class=\"section-number\">12. </span>Maintenance", "<span class=\"section-number\">2. </span>Masa3DB with Particle Devices", "<span class=\"section-number\">3. </span>Masa3DB with Python", "<span class=\"section-number\">4. </span>Initialising 3DCityDB", "<span class=\"section-number\">5. </span>Import CityGML", "<span class=\"section-number\">6. </span>Visualisation with Grafana", "<span class=\"section-number\">7. </span>Install 3DcityDB Web Map Client", "<span class=\"section-number\">8. </span>Analysis Using TimescaleDB", "<span class=\"section-number\">9. </span>Get SSL Certificate for you FROST-Server and Grafana Server", "<span class=\"section-number\">10. </span>Install Web Feature Service (WFS)", "<span class=\"section-number\">1. </span>Integration", "<span class=\"section-number\">11. </span>Building a cesiumJS viewer with Django", "<span class=\"section-number\">2. </span>Timescale-3DCityDB", "<span class=\"section-number\">3. </span>Particle Webhooks", "<span class=\"section-number\">4. </span>Bucardo Syncing (Failed)", "<span class=\"section-number\">5. </span>Building the Yun2Infinity Project with Django and Jupyter-Book", "<span class=\"section-number\">6. </span>Running Grafana behind a reverse proxy", "<span class=\"section-number\">7. </span>Nginx configuration", "<span class=\"section-number\">8. </span>Replicate", "<span class=\"section-number\">9. </span>Advance authentication with nginx", "<span class=\"section-number\">10. </span>Integrating BIMServer"], "terms": {"The": [0, 1, 3, 4, 6, 7, 8, 10, 12, 14, 15, 18, 19, 20, 21, 26], "open": [0, 4, 13, 14], "sourc": [0, 4, 11, 17, 20, 21], "platform": 0, "can": [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 13, 14, 16, 17, 20, 21], "handl": [0, 21], "spatial": 0, "time": [0, 6, 9, 13, 18, 19], "seri": [0, 1], "data": [0, 1, 4, 11, 12, 13, 16, 17, 19], "It": [0, 3, 4], "an": [0, 1, 3, 11, 13, 15, 18, 20, 21], "integr": [0, 19, 25], "follow": [0, 1, 2, 3, 6, 9, 10, 14, 19, 20, 21], "softwar": [0, 4, 14, 16], "postgresql": [0, 1, 6, 9, 16], "databas": [0, 1, 2, 4, 5, 7, 9, 10, 15, 16, 20, 24], "core": [0, 7, 10], "timescaledb": [0, 2, 18], "extens": [0, 4, 6, 18], "postgi": [0, 1, 15, 16, 18], "3dcitydb": [0, 1, 2, 5, 15, 16], "3d": [0, 10, 17], "citi": [0, 10, 14], "us": [0, 1, 2, 3, 5, 6, 7, 9, 10, 14, 17, 18, 20, 21, 25, 26], "model": [0, 4, 5, 16], "citygml": [0, 5, 12, 15, 16], "frost": [0, 3, 6, 9, 11, 13, 16, 19, 20, 23], "server": [0, 6, 9, 11, 13, 16, 19, 20, 21, 22, 23], "base": [0, 1, 3, 4, 6, 10, 12, 14, 15, 17, 18, 20, 21, 22], "implement": 0, "sensorth": [0, 1, 4, 7], "api": [0, 1, 4, 7, 11, 23], "i": [1, 3, 4, 14, 16, 17, 18, 20, 23], "am": [1, 4, 16, 20], "run": [1, 2, 3, 6, 8, 10, 12, 14, 15, 17, 18, 20, 21, 26], "so": [1, 3, 4, 16, 21], "you": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 18, 19, 20, 21, 23, 25, 26], "have": [1, 3, 5, 6, 8, 9, 10, 11, 14, 15, 16, 19, 20, 21, 23, 25], "your": [1, 2, 4, 5, 6, 7, 9, 11, 14, 18, 19, 20, 23, 24, 26], "machin": [1, 3, 6, 18, 20], "refer": [1, 9, 10, 13, 17, 18, 19, 21, 22, 26], "next": [1, 5, 9, 14, 20], "section": [1, 5, 16, 17, 18], "onc": [1, 2, 3, 6, 7, 10, 14, 18, 20, 21, 26], "written": [1, 7], "shellscript": [1, 3, 9, 20], "automat": [1, 5, 13], "fetch": [1, 21], "all": [1, 3, 4, 5, 6, 7, 10, 13, 14, 18, 20, 21], "necessari": [1, 2, 3, 4, 5, 7, 8, 11, 21], "contain": [1, 3, 6, 9, 14, 17, 18, 20, 21, 22, 23], "get": [1, 6, 9, 10, 11, 13, 18, 19, 20, 21], "up": [1, 2, 4, 15, 16, 17, 20], "current": [1, 6, 20], "ha": [1, 2, 4, 7, 18, 24], "onli": [1, 5, 6, 7, 10, 21], "been": [1, 16], "test": [1, 15], "ubuntu": [1, 4, 18, 20], "In": [1, 2, 3, 4, 5, 16, 17, 20, 21], "summari": 1, "nginx": [1, 2, 21, 22], "instruct": [1, 2, 3, 6, 7, 10, 12, 14, 15, 18, 21, 22], "from": [1, 2, 3, 5, 10, 13, 14, 16, 17, 18, 21, 22, 26], "offici": [1, 6, 21], "site": [1, 21], "here": [1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 13, 14, 15, 17, 18, 22], "22": 1, "04": 1, "go": [1, 3, 4, 5, 6, 7, 11, 14, 15, 17, 18, 20, 21, 22], "termin": [1, 18, 20], "thi": [1, 2, 3, 4, 6, 7, 8, 9, 10, 12, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 26], "command": [1, 3, 6, 9, 10, 13, 14, 17, 18, 20, 21, 26], "download": [1, 2, 3, 4, 8, 10, 17, 18, 20, 26], "packag": [1, 10, 18, 20], "curl": [1, 10, 18, 20], "l": [1, 10, 14, 18, 20, 21, 25], "http": [1, 6, 7, 10, 11, 14, 15, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26], "github": [1, 17, 18, 20, 26], "com": [1, 3, 6, 10, 11, 13, 14, 17, 18, 19, 20, 21, 22, 24, 25, 26], "chenkianwe": [1, 3, 18, 20, 21, 26], "archiv": [1, 18, 20], "xxxx": 1, "zip": [1, 3, 18, 20], "If": [1, 2, 7, 14, 15, 18, 19, 20, 26], "sudo": [1, 2, 3, 6, 9, 10, 14, 15, 18, 20, 21, 26], "apt": [1, 3, 10, 14, 18, 20], "unzip": [1, 3, 18, 20], "file": [1, 2, 3, 5, 6, 10, 14, 17, 18, 20, 21, 23, 26], "folder": [1, 2, 3, 17, 18, 21], "abl": [1, 4, 7, 11, 12, 15, 18, 21, 26], "see": [1, 4, 7, 18, 21, 26], "cd": [1, 3, 9, 18, 20], "execut": [1, 3, 6, 9, 13, 20], "masa3db": [1, 2, 4, 9, 13, 15, 16, 18, 20], "xxx": 1, "sh": [1, 2, 3, 9, 18, 20, 21], "setup_yun2inf": [1, 2, 3], "script": [1, 2, 4, 6, 13, 17, 18, 20], "ask": [1, 7, 20], "enter": [1, 3, 4, 14, 20, 21], "paramet": [1, 2, 4, 7, 8, 11, 14, 19, 20], "most": 1, "just": [1, 3, 7, 20], "accept": 1, "default": [1, 3, 18, 20, 22, 23], "rememb": [1, 4, 7, 9, 14, 16], "password": [1, 4, 11, 13, 14, 15, 19, 20], "usernam": [1, 4, 6, 9, 15, 19], "need": [1, 2, 3, 5, 7, 10, 20], "later": 1, "fill": [1, 4, 5, 7, 8, 11, 13, 14, 20], "pai": [1, 7], "attent": [1, 7], "two": [1, 3, 4, 14, 17, 20], "state": [1, 14], "below": [1, 4, 14, 18, 20], "servic": [1, 3, 7], "root": [1, 3, 14, 18, 21], "url": [1, 11, 14, 17, 19, 21], "alreadi": [1, 7, 8, 20], "domain": [1, 3, 14, 22], "name": [1, 2, 3, 4, 5, 7, 9, 10, 11, 12, 14, 15, 17, 19, 20, 21, 23], "exampl": [1, 2, 13, 14, 20], "our": [1, 3], "chaosbox": [1, 10, 13, 14, 20], "princeton": [1, 14], "edu": 1, "b": [1, 4, 5, 6, 7, 10, 14], "other": [1, 3, 20], "want": [1, 5, 6, 11, 13, 14, 20, 21], "allow": [1, 3, 5, 13, 14], "public": [1, 3, 4, 9, 13], "request": [1, 3, 15, 17, 19, 21], "without": [1, 3, 17], "set": [1, 9, 10, 14, 17, 19, 20, 21], "fals": [1, 3, 14, 17, 21], "c": [1, 4, 5, 6, 10, 14, 21], "success": [1, 11, 18, 26], "messag": [1, 6, 14, 17, 18, 20, 21, 26], "A": [1, 3, 20], "we": [1, 2, 4, 5, 13, 18, 20], "check": [1, 2, 3, 5, 7, 14, 20, 21], "successfulli": [1, 18, 26], "type": [1, 5, 17, 19, 23], "should": [1, 4, 9, 11], "5": [1, 3, 10, 13, 17, 20, 26], "ps": 1, "you_public_ip_address": 1, "land": 1, "mean": [1, 4, 5], "click": [1, 4, 11], "statu": [1, 3, 20, 21], "updat": [1, 4, 14, 18, 21], "prompt": [1, 3, 14], "kei": [1, 3, 4, 20, 21], "ar": [1, 2, 3, 4, 5, 6, 7, 10, 11, 12, 13, 14, 15, 18, 19, 20, 21], "admin": [1, 4, 17, 21], "chang": [1, 2, 3, 4, 6, 10, 11, 14, 20, 21, 22, 23], "do": [1, 2, 3, 4, 7, 9, 13, 14, 20], "shown": [1, 2, 4, 7, 14], "congratul": 1, "valu": [1, 13], "maxtop": 1, "10000": 1, "conf": [1, 3, 14, 22, 23], "context": 1, "xml": [1, 10, 14, 15], "make": [1, 2, 3, 7, 10, 11, 14, 19, 21], "copi": [1, 3, 5, 6, 7, 14, 18, 21, 23], "out": [1, 3, 6, 13, 14], "edit": [1, 3, 4, 14], "nano": [1, 18], "cp": [1, 3, 6, 14], "usr": [1, 9, 13, 26], "local": [1, 3, 4, 6, 14, 20, 26], "tomcat": [1, 14, 18, 26], "webapp": [1, 26], "meta": [1, 17, 21], "inf": 1, "chmod": [1, 14, 21], "o": [1, 14, 20, 26], "rw": 1, "after": [1, 3, 7, 20], "save": [1, 4, 10], "write": [1, 4, 5, 13, 20, 21], "permiss": [1, 14, 21], "back": [1, 3, 9], "its": [1, 3, 7, 9, 11], "origin": [1, 23], "remov": [1, 2, 14, 17, 21], "0": [1, 3, 5, 9, 10, 13, 14, 17, 18, 19, 20, 21, 26], "02": 1, "rmv_masa3db": 1, "non": 1, "Not": 1, "maintain": [1, 18, 26], "recommend": 1, "12": [1, 3, 13, 17], "procedur": 1, "found": [1, 7], "put": [1, 3, 11, 17], "ware": 1, "creat": [1, 3, 4, 5, 6, 8, 9, 10, 13, 14, 17, 18, 19, 20, 21, 26], "new": [1, 2, 3, 4, 6, 7, 11, 14, 17], "schema": [1, 4, 9], "add": [1, 3, 11, 14, 17, 20, 21], "search_path": [1, 9], "alter": [1, 9, 20], "chaos_sim": 1, "citydb": [1, 9, 15], "citydb_pkg": [1, 9], "user": [1, 3, 4, 9, 10, 11, 13, 18, 20], "authent": 1, "accord": [1, 4, 18, 20, 21, 26], "releas": [2, 17, 18, 20, 26], "timescal": [2, 6, 24], "latest": [2, 3, 6, 18, 24], "dockerhub": 2, "build": [2, 3, 10, 18, 26], "docker": [2, 3, 9, 10, 12, 14, 15, 18, 20, 21, 22, 26], "dockerfil": [2, 18, 21, 26], "grafana": [2, 3, 16, 23], "django": [2, 3], "yun2inf": [2, 3, 21, 23], "requir": [2, 10, 21], "txt": [2, 21], "sure": [2, 3, 10, 11], "librari": [2, 13], "date": 2, "bimserv": 2, "rebuild": 2, "backup": [2, 3], "befor": [2, 7, 20], "ani": [2, 19], "mainten": 2, "pull": [2, 18, 21, 26], "hub": [2, 18, 21, 26], "fraunhoferiosb": [2, 3], "instal": [2, 3, 4, 5, 8, 9, 18, 20, 21], "restor": 2, "them": [2, 5, 14, 20], "specifi": [2, 3, 5, 9, 10, 20, 21], "path": [2, 5, 9, 10, 14, 17, 21], "doe": [2, 3, 9, 20], "load": [2, 17, 21], "browser": [2, 3, 7, 15], "while": [2, 4, 7], "restart": [2, 3, 9, 14, 21], "db": [2, 20, 21], "forc": 2, "webpag": [2, 14, 21], "good": 3, "tutori": [3, 7, 20, 21, 22, 25], "configur": [3, 7, 9, 17, 21, 22, 24], "web": [3, 5, 10], "realpython": [3, 21], "gunicorn": 3, "resiz": 3, "workload": 3, "doc": [3, 6, 17, 21, 24, 25], "amazon": 3, "awsec2": 3, "userguid": 3, "ec2": 3, "instanc": [3, 10], "html": [3, 17, 21], "stackoverflow": [3, 17], "question": [3, 17], "69741113": 3, "increas": 3, "volum": [3, 21], "hard": 3, "disk": 3, "linux": 3, "resta": 3, "recogn": 3, "expand": 3, "support": 3, "en": [3, 17, 21], "articl": 3, "connect": [3, 5, 6, 9, 10, 13, 20, 23], "account": [3, 7], "extern": 3, "resourc": [3, 20], "third": 3, "parti": 3, "setup": [3, 4, 7, 8, 10, 11, 19, 20, 23], "virtual": [3, 21], "associ": 3, "elast": 3, "ip": 3, "yun2infin": [3, 17, 18], "x": [3, 17, 18, 21, 23], "custom": [3, 19], "yun2inf_book": [3, 17, 21], "app": [3, 17], "project": [3, 7, 10, 16, 17], "jupyt": [3, 17], "book": [3, 17], "my": [3, 4, 15, 18, 20], "comput": [3, 4], "e": [3, 10, 15, 21], "g": [3, 10], "gener": [3, 4, 5, 10], "jupyterbook": [3, 21], "inform": [3, 4, 7, 13, 19, 20], "etc": [3, 10, 14, 23], "push": [3, 17, 18, 21, 26], "onto": [3, 6, 7], "scp": 3, "pem": [3, 14], "instance_ip_add": 3, "On": [3, 5], "imag": [3, 12, 15, 17, 18, 21, 26], "appropri": 3, "echo": [3, 6, 21], "try": [3, 7, 13, 16, 21], "start": [3, 10, 14, 20], "now": [3, 4, 14, 20], "d": [3, 4, 6, 12, 15, 18, 21, 23], "containername4": [3, 23], "h": [3, 21], "network": [3, 4, 15, 20, 21], "p": [3, 12, 15, 21], "yport": 3, "8000": [3, 12, 21, 23], "v": [3, 6, 12, 14, 21], "y2i": [3, 21], "yun2inf_project": [3, 17, 21, 23], "www": [3, 10, 12, 17, 19, 21, 23], "static": [3, 17, 21, 23], "1": [3, 6, 7, 9, 10, 11, 13, 14, 16, 17, 18, 19, 20, 21, 23, 25, 26], "THE": [3, 9], "revers": [3, 25], "proxi": [3, 23, 25], "OF": 3, "server_nam": [3, 23], "your_domain_nam": 3, "listen": [3, 20, 23], "80": [3, 23], "access_log": [3, 23], "var": [3, 12, 17, 20, 21, 23], "log": [3, 11, 14, 21, 23], "host": [3, 4, 6, 10, 13, 15, 17, 20, 23, 24], "error_log": [3, 23], "proxy_redirect": [3, 23], "post": [3, 7, 8, 10, 12, 14, 15, 19, 20], "235": 3, "locat": [3, 10, 19, 21, 23], "proxy_pass": [3, 23], "containername2": [3, 23], "8080": [3, 14, 15, 19, 23], "localhost": [3, 4, 6, 9, 10, 13, 17, 20, 23], "proxy_read_timeout": [3, 23], "240": [3, 23], "proxy_set_head": [3, 23], "ini": [3, 14, 22], "protocol": [3, 14, 22], "h2": 3, "socket": [3, 21], "address": [3, 20], "bind": [3, 21], "empti": 3, "interfac": [3, 10, 21], "http_addr": 3, "port": [3, 10, 13, 14, 20], "http_port": [3, 22], "3000": [3, 23], "face": 3, "redirect": [3, 21], "correct": [3, 14], "header": [3, 23], "match": 3, "dn": 3, "rebind": 3, "enforce_domain": 3, "py": [3, 8, 17, 21], "input": [3, 17, 21], "variabl": 3, "turn": 3, "off": [3, 23], "debg": 3, "debug": [3, 20], "allowed_host": 3, "directori": [3, 6, 9, 14, 18, 20, 21, 26], "45733444": 3, "forward": [3, 23], "443": 3, "cheapsslsecur": 3, "blog": 3, "certbot": 3, "geko": 3, "cloud": 3, "letsencrypt": 3, "alpin": [3, 21], "eff": 3, "org": [3, 10, 17, 18], "ws": 3, "os": [3, 21], "debianbust": 3, "tab": [3, 4, 5, 11], "standard": [3, 11], "readthedoc": 3, "io": [3, 7, 21, 25], "stabl": 3, "autom": 3, "renew": 3, "bash": [3, 6, 9, 14, 20, 21], "exec": [3, 6, 9, 14, 20, 21], "nginx_container_nam": 3, "yun2inf_nginx": 3, "apk": [3, 21], "appli": 3, "crontab": 3, "autorenew": 3, "quiet": 3, "dry": 3, "work": [3, 7, 9, 10, 16, 17, 18, 20], "uncom": [3, 14], "line": [3, 10, 14, 21], "server_token": [3, 23], "each": [3, 5, 16], "block": [3, 23], "proto": [3, 23], "scheme": [3, 14, 23], "For": [3, 5, 13, 14, 17, 19, 20, 22, 23], "proxy_add_x_forwarded_for": [3, 23], "more": [3, 12, 13, 15, 19], "secur": [3, 23], "includ": [3, 4, 5, 16, 17, 21, 23], "both": [3, 14, 16, 20], "serverfault": 3, "874936": 3, "ad": [3, 10, 20], "hst": 3, "config": [3, 10, 21, 23], "add_head": [3, 23], "strict": [3, 23], "transport": [3, 23], "max": [3, 23], "ag": [3, 23], "300": [3, 23], "alwai": [3, 5, 23], "31536000": 3, "year": 3, "security_head": 3, "feel": 3, "confid": 3, "everyth": [3, 11], "stuff": 3, "r": [3, 21], "exit": [3, 20], "zipfil": 3, "eladnava": 3, "monitor": 3, "health": 3, "email": 3, "alert": 3, "import": [3, 5, 13, 14, 17, 21], "healthcheck": 3, "immedi": 3, "stack": 3, "overflow": 3, "1063352": 3, "rel": [3, 17], "small": 3, "spike": 3, "caus": 3, "100": 3, "cpu": 3, "usag": 3, "sysopstechnix": 3, "protect": [3, 23], "lazi": 3, "dev": [3, 21], "seifer": 3, "guru": 3, "2021": [3, 13], "01": [3, 20], "thei": [3, 4, 17, 18], "top": [3, 5], "limit_req_zon": 3, "binary_remote_addr": 3, "zone": 3, "myzon": 3, "20m": 3, "rate": 3, "5r": 3, "s": [3, 5, 13, 17, 20, 22], "limit_req": 3, "burst": 3, "nodelai": 3, "jail": 3, "look": 3, "enabl": [3, 14, 19], "true": [3, 14, 17, 21, 22], "filter": [3, 19], "action": [3, 4], "iptabl": 3, "multiport": 3, "reqlimit": 3, "tcp": 3, "logpath": 3, "error": [3, 6, 20, 21], "findtim": 3, "maxretri": 3, "3": [3, 7, 10, 13, 17, 18, 20, 21], "bantim": 3, "3600": 3, "banact": 3, "ban": 3, "common": 3, "sed": 3, "reconfigur": 3, "system": 3, "systemctl": 3, "list": [3, 14, 20], "client": [3, 5, 10], "unban": 3, "unbanip": 3, "10": [3, 7, 18], "xx": 3, "15x": 3, "12x": 3, "access": [4, 13, 15, 17, 19, 21, 23], "underli": 4, "how": [4, 17, 18], "store": 4, "also": [4, 23], "which": 4, "gui": [4, 10], "manag": [4, 10, 16, 17, 21, 25], "assum": [4, 14], "own": [4, 18], "laptop": 4, "pc": 4, "remot": 4, "first": [4, 5, 14], "right": [4, 11], "case": 4, "chao": [4, 12], "process": [4, 7, 21], "detail": [4, 5, 7, 9, 11, 12, 15], "ssh": [4, 10, 20], "tunnel": [4, 10, 20], "As": [4, 10, 16], "spatempdb": [4, 6, 9, 13, 15, 20], "tabl": [4, 13, 20], "20": [4, 13, 21], "iot": [4, 7, 16, 19], "view": [4, 5, 16, 17, 21], "row": [4, 13], "There": [4, 21], "three": 4, "defin": [4, 5], "read": [4, 14, 20, 25], "renam": 4, "desir": 4, "new_user_nam": 4, "doubl": 4, "cell": 4, "Then": [4, 5, 6, 14, 17, 21], "button": [4, 5, 7], "similarli": 4, "user_rol": 4, "reflect": 4, "user_nam": 4, "role": [4, 6, 9], "delet": [4, 6, 14, 23], "manipul": 4, "tool": 5, "prefer": 5, "left": 5, "panel": [5, 11], "kml": 5, "collada": 5, "window": 5, "tick": 5, "collada2gltf": 5, "select": [5, 6, 10, 11, 13], "version": [5, 16], "2": [5, 7, 10, 16, 18, 19, 20, 21], "json": [5, 17, 19], "jsonp": 5, "callback": 5, "method": 5, "handle_3dcitydb_data": 5, "At": [5, 11, 18], "brows": 5, "singl": 5, "object": [5, 13, 17, 19], "bound": 5, "box": [5, 17], "calcul": 5, "featur": 5, "oper": 5, "choos": [5, 11], "tile": [5, 17], "option": [5, 11, 14, 23], "size": 5, "125mx125m": 5, "level": [5, 21], "displai": [5, 11], "either": 5, "footprint": 5, "extrud": 5, "geometri": [5, 10], "lod": 5, "extrus": 5, "surfac": 5, "textur": 5, "visibl": 5, "____": 5, "pixel": 5, "when": [5, 7, 9, 18, 20, 21, 23], "googl": 5, "earth": 5, "pro": 5, "map": [5, 10, 17, 20, 23], "render": [5, 17, 21], "bigger": 5, "number": [5, 21], "zoom": 5, "closer": 5, "spshg": 5, "let": [5, 7, 17], "attribut": [5, 17], "previou": [5, 17], "step": [5, 7], "semant": 5, "csv": [5, 13], "column": 5, "content": [5, 17, 21, 23], "container_nam": [6, 14], "document": [6, 9, 10, 13, 16, 17, 18], "pg_dump": 6, "pg_dumpal": 6, "dbname": [6, 13, 20], "postgr": [6, 13, 18, 20], "5432": [6, 9, 10, 13, 15, 20], "quot": 6, "identifi": 6, "sql": 6, "u": [6, 9, 14], "harmless": 6, "format": [6, 19], "plain": 6, "tablespac": 6, "owner": [6, 21], "privileg": 6, "containernam": [6, 14], "perform": 6, "exist": 6, "clean": 6, "psql": [6, 9, 20], "dbuser": 6, "drop": 6, "IF": 6, "NOT": [6, 9], "cascad": 6, "on_error_stop": 6, "f": [6, 20, 21], "timescaledb_pre_restor": 6, "timescaledb_post_restor": 6, "self": [6, 14, 23, 24], "downgrad": 6, "unfamilar": 7, "pleas": [7, 22], "through": [7, 17], "familiaris": 7, "yourself": 7, "8": [7, 17, 19], "webhook": 7, "doesn": 7, "t": [7, 11, 16, 18, 21, 26], "factori": 7, "reset": 7, "help": [7, 17], "registr": 7, "again": [7, 16, 20], "begin": 7, "hold": 7, "mode": [7, 23], "down": 7, "tap": 7, "briefli": 7, "second": 7, "blink": 7, "yellow": 7, "keep": 7, "4": [7, 9, 10, 13, 18, 20, 21], "white": 7, "happen": 7, "begun": 7, "6": 7, "past": [7, 21], "link": [7, 17], "login": [7, 18, 21, 26], "stapi01_isdeviceregist": 7, "shared_app": 7, "5fe0f742e6f0b000092ded1": 7, "stapi02_registerdevic": 7, "60259cc4479fdf00089f7c34": 7, "stapi03_registernewdeploy": 7, "6046681e4debcb0009099aa4": 7, "stapi04_registersensor": 7, "5fd428b6e6f0b000092d6e8": 7, "stapi05_registerobservedprop": 7, "5fd42bd0e6f0b000092d6eba": 7, "stapi06_postobserv": 7, "5fd269b0483a480017a34ddb": 7, "regist": [6, 7, 8], "flash": 7, "stapi02": 7, "registerdevic": 7, "under": [7, 17], "event": [7, 19], "not_regist": 7, "registration_detail": 7, "accordingli": [7, 23], "publish": 7, "take": [6, 7, 20], "multi": 7, "datastream": [7, 8, 11, 13, 19], "id": [7, 10, 13, 17, 19, 20, 21], "duplic": 7, "sensor": [7, 8, 19], "deploy": [7, 21, 25], "given": 7, "One": 7, "observ": [7, 8, 13, 19, 20], "properti": [7, 8, 11, 19], "re": [7, 13, 14], "purpos": 7, "same": [7, 16], "differ": [7, 17], "With": 7, "templat": [7, 17, 21], "adjust": 7, "familiar": 8, "program": [8, 16], "To": [8, 10, 11, 21], "sensorthings_reg_sensor_prop": 8, "thing": [8, 11, 19], "multidatastream": [8, 19], "sensorthings_reg_things_d": 8, "sensorthings_post_observ": 8, "full": [9, 10], "whatev": 9, "relev": [9, 19], "unix": 9, "vi": [9, 14], "connection_detail": 9, "provid": 9, "export": [9, 14, 21], "pgbin": 9, "bin": [9, 18, 21], "pghost": 9, "pgport": 9, "pguser": 9, "create_db": 9, "WITH": 9, "search": [9, 11, 17, 19], "pre": 9, "sequenc": 9, "fail": [9, 16], "consol": [9, 10], "java": 10, "allowtcpforward": 10, "ye": [10, 14, 19], "usual": 10, "sshd": 10, "establish": [10, 20], "local_ip": 10, "local_port": 10, "destin": 10, "destination_port": 10, "ssh_server": 10, "valid": [10, 14], "jar": 10, "websit": [10, 17, 18, 21, 26], "fileadmin": 10, "downloaddata": 10, "3dcitydb_impexp": 10, "openjdk": 10, "14": 10, "jre": 10, "headless": 10, "y": [10, 17, 18], "n": [10, 20], "manual": 10, "sampl": [10, 17], "plugin": 10, "spreadsheet": 10, "easiest": 10, "wai": [10, 20], "config_fil": 10, "graphic": 10, "via": 10, "dialog": 10, "main": [10, 13], "menu": [10, 11], "bar": [10, 11, 17], "feed": 10, "argument": 10, "impexp": 10, "shell": 10, "import_fil": 10, "gml": 10, "show": [10, 17], "height": 10, "measured_height": 10, "cityobject": 10, "inner": [10, 16], "join": 10, "st_asgml": 10, "surface_geometri": 10, "where": [10, 13, 20], "adminstr": 11, "msg": 11, "correctli": 11, "v1": [11, 19, 26], "basic": [11, 19], "auth": [11, 17, 19, 21], "side": 11, "datasourc": 11, "entrypoint": [11, 18, 21], "commun": 11, "secondari": [11, 24], "vanish": 11, "77745": 11, "overrid": 11, "placement": 11, "label": 11, "legend": 11, "overid": 11, "field": 11, "By": [12, 15], "visualis": 12, "cesiumj": [12, 16], "3dwebmap": 12, "home": [12, 13], "3dcitydata": 12, "tumgi": [12, 15], "result": [13, 19, 20, 21], "within": 13, "period": 13, "psycopg2": 13, "sshtunnel": 13, "sshtunnelforward": 13, "pytz": 13, "ds_id": 13, "15": [13, 17], "res_path": 13, "rows2d": 13, "datetim": 13, "st_time_str": 13, "2023": 13, "07": 13, "19": 13, "08": [13, 17], "00": 13, "end_time_str": 13, "17": 13, "30": 13, "function": [13, 17], "def": [13, 17, 19, 21], "get_data": 13, "ssh_usernam": 13, "usrnam": 13, "ssh_password": 13, "remote_bind_address": 13, "local_bind_address": 13, "conn": 13, "cursor": 13, "print": 13, "except": [13, 21], "notconnect": 13, "str": 13, "queri": [13, 19], "st_time": 13, "03": 13, "29": 13, "end_tim": 13, "13": 13, "result_tim": 13, "result_numb": 13, "datastream_id": 13, "order": 13, "BY": [13, 17], "asc": 13, "fetchal": 13, "close": [6, 13, 23], "return": [13, 15, 17, 21], "rows1": 13, "local_tim": 13, "astimezon": 13, "timezon": 13, "america": 13, "new_york": 13, "lt_str": 13, "isoformat": 13, "append": 13, "w": 13, "newlin": 13, "csvfile": 13, "writer": 13, "csvwriter": 13, "writerow": 13, "averag": 13, "arbitrari": 13, "interv": 13, "extract": 13, "everi": 13, "hour": 13, "week": 13, "minut": 13, "python": [13, 17, 21], "ipaddress": 13, "median": 13, "AS": 13, "avg_tim": 13, "percentile_cont": 13, "group": [13, 21], "median_valu": 13, "desc": [13, 19], "avg": 13, "minimum": 13, "maximum": 13, "similar": 13, "27": 13, "bucket": 13, "gapfil": 13, "gap": 13, "previous": 13, "seen": 13, "locf": 13, "interpol": 13, "between": 13, "interact": 14, "keystor": 14, "keytool": 14, "genkei": 14, "alia": [14, 23], "domain_nam": 14, "keyalg": 14, "rsa": 14, "keysiz": 14, "2048": 14, "file_nam": 14, "jk": 14, "substitut": 14, "real": 14, "cert": 14, "365": 14, "what": [14, 16], "last": 14, "unknown": 14, "andlchaos300l": 14, "xyz": 14, "organiz": 14, "unit": 14, "your_unit": 14, "organ": 14, "provinc": 14, "letter": 14, "countri": 14, "code": [14, 16, 17, 21], "Is": 14, "cn": 14, "ou": 14, "st": 14, "jersei": 14, "certreq": 14, "csr_kei": 14, "These": [14, 21], "crt": 14, "intermedi": 14, "repli": 14, "wa": [14, 18], "correspond": 14, "storepass": 14, "aliasnam": 14, "vim": 14, "text": 14, "did": 14, "still": [14, 16], "connector": 14, "segment": 14, "connectiontimeout": 14, "20000": 14, "redirectport": 14, "8443": 14, "extra": 14, "encrypt": 14, "sslenabl": 14, "keystorefil": 14, "keystorepass": 14, "keystore_password": 14, "clientauth": 14, "sslprotocol": 14, "tl": 14, "privat": 14, "granfana": 14, "importkeystor": 14, "srckeystor": 14, "destkeystor": 14, "p12": 14, "deststoretyp": 14, "pkcs12": 14, "srcalia": 14, "deststorepass": 14, "your_password": 14, "destkeypass": 14, "openssl": [14, 21], "nokei": 14, "node": 14, "nocert": 14, "grafana_container_nam": 14, "640": 14, "infront": 14, "cert_fil": 14, "cert_kei": 14, "done": [14, 16], "fine": 15, "grain": 15, "8765": 15, "citydb_connection_typ": 15, "citydb_connection_serv": 15, "container_name_hosting3dcitydb": 15, "citydb_connection_port": 15, "citydb_connection_sid": 15, "citydb_connection_us": 15, "citydb_connection_password": 15, "getcap": 15, "made": 16, "some": [6, 16, 18], "customis": 16, "tweak": 16, "progress": 16, "attempt": 16, "benefici": 16, "won": 16, "repeat": 16, "mistak": 16, "decid": [16, 20], "pick": 16, "jupyterlab": 16, "environ": [16, 21], "mobiu": 16, "visual": 16, "geospati": 16, "openbimserv": 16, "berkeleydb": 16, "speckl": 16, "cde": 16, "openproject": 16, "git": 16, "understand": [17, 18, 21, 26], "csviewer": 17, "startapp": [17, 21], "call": [17, 21], "doctyp": 17, "lang": 17, "head": 17, "charset": 17, "utf": 17, "src": [17, 23], "cesium": 17, "107": 17, "js": 17, "href": 17, "widget": 17, "css": 17, "stylesheet": 17, "bodi": [17, 19], "div": 17, "cesiumcontain": 17, "modul": 17, "cesium_script": 17, "csviz": 17, "3dtile": 17, "place": [17, 18], "javascript": 17, "ion": 17, "token": 17, "null": 17, "avoid": 17, "warn": 17, "defaultaccesstoken": 17, "stamen": 17, "2019": 17, "28": 17, "sai": 17, "mai": 17, "free": 17, "charg": 17, "like": [17, 21], "toner": 17, "lite": 17, "z": 17, "png": 17, "stamenattribut": 17, "design": 17, "creativecommon": 17, "licens": 17, "cc": 17, "openstreetmap": 17, "copyright": 17, "odbl": 17, "per": 17, "carto": 17, "regard": 17, "basemap": 17, "cartoattribut": 17, "providerviewmodel": 17, "imageri": 17, "imageryviewmodel": 17, "positron": 17, "tooltip": 17, "cartodb": 17, "iconurl": 17, "cartocdn": 17, "light_al": 17, "creationfunct": 17, "urltemplateimageryprovid": 17, "credit": 17, "minimumlevel": 17, "maximumlevel": 17, "18": 17, "initi": 17, "const": 17, "imageryproviderviewmodel": 17, "selectedimageryproviderviewmodel": 17, "anim": 17, "timelin": 17, "infobox": 17, "homebutton": 17, "fullscreenbutton": 17, "selectionind": 17, "geocod": 17, "creditcontain": 17, "createel": 17, "none": [17, 20], "terrain": 17, "baselayerpick": 17, "viewmodel": 17, "terrainproviderviewmodel": 17, "removeal": 17, "scene": 17, "tileset": 17, "await": 17, "cesium3dtileset": 17, "fromurl": 17, "tilesetwithrequestvolum": 17, "primit": 17, "flyto": 17, "httprespons": 17, "loader": 17, "cesium_view": 17, "get_templ": 17, "fild": 17, "urlpattern": [17, 21], "installed_app": [17, 21], "contrib": [17, 21], "contenttyp": [17, 21], "session": [17, 21], "staticfil": [17, 21], "migrat": [17, 21], "container": 17, "gist": 17, "banesullivan": 17, "e3cc15a3e2e865d5ab8bae6719733752": 17, "76015471": 17, "prevent": 17, "logo": 17, "44372068": 17, "find": [17, 18, 21, 26], "offlin": 17, "cesiumg": 17, "learn": 17, "prem": 17, "a2zq": 17, "develop": [18, 21], "unabl": 18, "postgresql15": 18, "postgis3": 18, "had": 18, "built": [18, 26], "ref": [18, 20], "tag": [18, 20, 21, 26], "ls": [18, 21], "create_extension_postgis_ext": 18, "lastli": 18, "initialis": 18, "initdb": [18, 21], "pg15": 18, "ts2": 18, "oss": 18, "gmail": [18, 26], "upgrad": [18, 23], "wget": [18, 26], "v4": 18, "rm": 18, "quick": [18, 20, 21, 26], "upload": [18, 21, 26], "repositori": [18, 21, 26], "yournam": [18, 21, 26], "imagenam": [18, 21, 26], "raspberri": 18, "pi": 18, "debian": 18, "init": 18, "jdk": 18, "apach": 18, "osuosl": 18, "9": [18, 26], "v9": 18, "50": 18, "tar": 18, "gz": 18, "mechan": 19, "devic": 19, "getfilt": 19, "advanc": 19, "respons": 19, "topic": 19, "particle_device_id": 19, "hook": 19, "particle_event_nam": 19, "enforc": 19, "ssl": [19, 23], "No": 19, "page": 19, "postth": 19, "thingnam": 19, "descript": 19, "thingdesc": 19, "uid": 19, "pin": 19, "foinam": 19, "foidesc": 19, "encodingtyp": 19, "entyp": 19, "loctyp": 19, "coordin": 19, "coordx": 19, "coordi": 19, "coordz": 19, "postdatastream": 19, "datastrean": 19, "dsname": 19, "dsdesc": 19, "observationtyp": 19, "obstyp": 19, "unitofmeasur": 19, "uomnam": 19, "symbol": 19, "uomsym": 19, "definit": 19, "uomdef": 19, "thingid": 19, "observedproperti": 19, "obspropid": 19, "sensorid": 19, "postmultidatastream": 19, "multidatastrean": 19, "opengi": 19, "net": 19, "ogc": 19, "om": 19, "om_complexobserv": 19, "multiobservationdatatyp": 19, "postobserv": 19, "phenomenontim": 19, "resulttim": 19, "dsid": 19, "postmultiobserv": 19, "multiobserv": 19, "createobserv": 19, "compon": 19, "dataarrai": 19, "result1": 19, "result2": 19, "count": 19, "mdsid": 19, "postsensor": 19, "encodetyp": 19, "metadata": 19, "postobsproperti": 19, "dig": 20, "veri": 20, "deep": 20, "why": 20, "masadb": 20, "brief": 20, "diagnos": 20, "experi": 20, "hypert": 20, "replic": 20, "master": 20, "masterdb1": 20, "masterdb2": 20, "smooth": 20, "howev": 20, "think": 20, "becaus": 20, "lock": 20, "itself": 20, "verifi": 20, "guess": 20, "due": 20, "give": 20, "pursu": 20, "entri": 20, "background": [20, 21], "bucardo_instal": 20, "05": 20, "primari": [20, 24], "phenomenon_time_start": 20, "install_bucardo": 20, "sinc": 20, "5431": 20, "complet": 20, "pid": [20, 21], "superus": 20, "log_level": 20, "insid": 20, "127": 20, "5900": 20, "m": 20, "end": 20, "anoth": [20, 21], "5901": 20, "192": 20, "168": 20, "248": 20, "db1_name": 20, "db2_name": 20, "capabl": 20, "conflict": 20, "db1": 20, "prioriti": 20, "sync_nam": 20, "db2": 20, "standbi": 20, "target": 20, "stop": 20, "onlin": 21, "w3school": 21, "index": 21, "php": 21, "pip": 21, "startproject": 21, "describ": 21, "_build": 21, "equiv": 21, "refresh": 21, "shortcut": 21, "djangoproject": 21, "howto": 21, "static_root": 21, "collect": 21, "one": 21, "collectstat": 21, "runserv": 21, "secret": 21, "secret_kei": 21, "insecur": 21, "o6w": 21, "a46mx": 21, "replac": 21, "keyerror": 21, "rais": 21, "runtimeerror": 21, "could": 21, "rand": 21, "hex": 21, "40": 21, "django_secret_kei": 21, "prod": 21, "structur": 21, "sqlite3": 21, "cut": 21, "multiprocess": 21, "wsgi": 21, "applic": 21, "pattern": 21, "module_nam": 21, "variable_nam": 21, "wsgi_app": 21, "granular": 21, "output": 21, "loglevel": 21, "info": 21, "worker": 21, "cpu_count": 21, "reload": 21, "accesslog": 21, "errorlog": 21, "stdout": 21, "stderr": 21, "capture_output": 21, "easili": 21, "pidfil": 21, "daemon": 21, "detach": 21, "ensur": 21, "know": 21, "mkdir": 21, "pv": 21, "chown": 21, "cr": 21, "tail": 21, "kill": 21, "pkill": 21, "issu": [21, 25], "resolv": 21, "webserv": 21, "guid": 21, "yun2inf_init": 21, "django_set_kei": 21, "logfil": 21, "captur": 21, "11": 21, "varibl": 21, "env": [21, 26], "pythondontwritebytecod": 21, "pythonunbuff": 21, "cach": 21, "yun2inf_gunicorn": 21, "mount": 21, "workdir": [21, 26], "dir": 21, "expos": 21, "driver": 21, "bridg": 21, "subdomain": 22, "your_url": 22, "root_url": 22, "serve_from_sub_path": 22, "http_upgrad": 23, "connection_upgrad": 23, "upstream": 23, "containername3": 23, "autoindex": 23, "http_host": 23, "live": 23, "websocket": 23, "proxy_http_vers": 23, "certif": 23, "includesubdomain": 23, "preload": 23, "frame": 23, "deni": 23, "nosniff": 23, "polici": 23, "xss": 23, "referr": 23, "stream": 24, "kzhekov": 25, "medium": 25, "introduct": 25, "iam": 25, "keycloak": 25, "7b1127a16e0": 25, "itnext": 25, "front": 25, "21e4b3f8ec53": 25, "apoorv": 25, "varma": 25, "part": 25, "cece5edc67ff": 25, "suit": 25, "acm": 25, "introspect": 25, "levelup": 25, "gitconnect": 25, "behind": 25, "tip": 25, "972441695412": 25, "zivc": 25, "gumroad": 25, "wqfor": 25, "76": 26, "jdk11": 26, "temurin": 26, "jammi": 26, "catalina_opt": 26, "xms1024m": 26, "xmx4g": 26, "opensourcebim": 26, "184": 26, "bimserverwar": 26, "war": 26, "15min": 6}, "objects": {}, "objtypes": {}, "objnames": {}, "titleterms": {"introduct": 0, "yun2infin": [0, 1, 16, 21], "instal": [1, 10, 11, 12, 14, 15], "docker": [1, 6, 23], "setup": 1, "increas": 1, "page": 1, "frost": [1, 2, 4, 14], "server": [1, 2, 3, 4, 10, 14], "improv": 1, "perform": 1, "uninstal": 1, "updat": 2, "all": 2, "contain": 2, "imag": 2, "deploi": 3, "aw": 3, "wix": 3, "subdomain": 3, "access": 3, "your": [3, 10, 21], "site": 3, "over": 3, "http": 3, "ssl": [3, 14], "tl": 3, "certif": [3, 14], "set": [3, 4], "up": 3, "route53": 3, "when": 3, "websit": 3, "goe": 3, "down": 3, "fail2ban": 3, "nginx": [3, 23, 25], "limit": 3, "req": 3, "modul": 3, "prevent": 3, "ddo": 3, "attack": 3, "postgresql": 4, "connect": 4, "us": [4, 13], "pgadmin": 4, "authent": [4, 25], "export": [5, 10], "gltf": 5, "mainten": 6, "backup": 6, "restor": 6, "databas": 6, "upgrad": 6, "timescaledb": [6, 13], "masa3db": [7, 8], "particl": [7, 19], "devic": 7, "pre": [7, 8], "requisit": [7, 8], "claim": 7, "script": [7, 8], "python": 8, "initialis": 9, "3dcitydb": [9, 10, 12, 18], "import": 10, "citygml": 10, "tool": 10, "local": 10, "machin": 10, "recommend": 10, "sql": 10, "check": 10, "data": 10, "visualis": 11, "grafana": [11, 14, 22], "linksmart": 11, "sensorth": 11, "plugin": 11, "creat": 11, "dashboard": 11, "dual": 11, "axi": 11, "overidd": 11, "web": [12, 15], "map": 12, "client": 12, "analysi": 13, "time_bucket": 13, "time_bucket_gapfil": 13, "get": 14, "you": 14, "gener": 14, "csr": 14, "kei": 14, "sign": 14, "featur": 15, "servic": 15, "wf": 15, "integr": [16, 26], "vision": 16, "build": [17, 21], "cesiumj": 17, "viewer": 17, "django": [17, 21], "resourc": 17, "timescal": 18, "webhook": 19, "bucardo": 20, "sync": 20, "fail": 20, "reason": 20, "failur": 20, "project": 21, "jupyt": 21, "book": 21, "serv": 21, "app": 21, "gunicorn": 21, "container": 21, "run": 22, "behind": 22, "revers": 22, "proxi": 22, "configur": 23, "replic": 24, "advanc": 25, "bimserv": 26}, "envversion": {"sphinx.domains.c": 2, "sphinx.domains.changeset": 1, "sphinx.domains.citation": 1, "sphinx.domains.cpp": 6, "sphinx.domains.index": 1, "sphinx.domains.javascript": 2, "sphinx.domains.math": 2, "sphinx.domains.python": 3, "sphinx.domains.rst": 2, "sphinx.domains.std": 2, "sphinx.ext.intersphinx": 1, "sphinx": 56}})