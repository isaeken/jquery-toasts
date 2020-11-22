# jquery-toasts
A simple & lightweight toast messages library

---

<center>

![Requires.io](https://img.shields.io/requires/github/isaeken/jquery-toasts) ![npm](https://img.shields.io/npm/dt/jquery-toasts) ![GitHub](https://img.shields.io/github/license/isaeken/jquery-toasts) ![npm](https://img.shields.io/npm/v/jquery-toasts)
![GitHub followers](https://img.shields.io/github/followers/isaeken?style=social) ![GitHub Repo stars](https://img.shields.io/github/stars/isaeken/jquery-toasts?style=social)

</center>

---

## Installation
You can install jquery-toasts plugin using npm or include directly files

#### install using npm
```bash
npm install jquery-toasts
```
#### or include files
````html
<head>
...
<link rel="stylesheet" href="/your/servers/assets/path/css/jquery-toasts.min.css">
<script src="/your/servers/assets/path/js/jquery.min.js"></script>
<script src="/your/servers/assets/path/js/anime.min.js"></script>
<script src="/your/servers/assets/path/js/jquery-toasts.min.js"></script>
...
</head>
````

## Simple Usage
creating toast with element attributes
````html
<button data-toast="Your toast message">Create toast using attribute</button>
<button data-toast="Your toast message" data-timeout="1000">Create toast using attribute with timeout</button>
````
or jQuery
````javascript
$.toast('Your toast message');
````

## Help and docs
Please report bugs from issues tab
- [Documentation](https://isaeken.github.io/jquery-toasts/)
