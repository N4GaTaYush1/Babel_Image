function generateRandomColorImage() {
    const canvas = document.getElementById('randomColorCanvas');
    const context = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const pixelSize = 4; // ピクセルサイズを4倍に設定

    for (let y = 0; y < height; y += pixelSize) {
        for (let x = 0; x < width; x += pixelSize) {
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            context.fillStyle = `rgb(${r},${g},${b})`;
            context.fillRect(x, y, pixelSize, pixelSize); // ピクセルサイズを適用
        }
    }
}

let intervalId;

document.getElementById('startButton').addEventListener('click', () => {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
        document.getElementById('startButton').textContent = getTranslation('start');
    } else {
        generateRandomColorImage();
        intervalId = setInterval(generateRandomColorImage, 1000);
        document.getElementById('startButton').textContent = getTranslation('stop');
    }
});

document.getElementById('saveButton').addEventListener('click', () => {
    const canvas = document.getElementById('randomColorCanvas');
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'random_color_image.png';
    link.click();
});

document.getElementById('shareButton').addEventListener('click', async () => {
    const canvas = document.getElementById('randomColorCanvas');
    const dataUrl = canvas.toDataURL('image/png');
    const blob = await (await fetch(dataUrl)).blob();
    const filesArray = [
        new File([blob], 'random_color_image.png', {
            type: blob.type,
            lastModified: new Date().getTime()
        })
    ];
    const shareData = {
        files: filesArray,
    };
    try {
        await navigator.share(shareData);
        console.log('共有に成功しました');
    } catch (err) {
        console.error('共有に失敗しました', err);
    }
});

function getTranslation(key) {
    const translations = {
        'title': {
            'ja': 'あらゆるものを映し出す、画像生成',
            'en': 'Image Generation Reflecting Everything'
        },
        'poem': {
            'ja': 'あなたはここで、<br>過去、未来の、<br>あらゆるものを<br>見ることができる可能性があります。<br>',
            'en': 'Here, you may see<br>everything from the past and future.<br>'
        },
        'start': {
            'ja': '再生',
            'en': 'Start'
        },
        'stop': {
            'ja': '停止',
            'en': 'Stop'
        },
        'save': {
            'ja': '保存',
            'en': 'Save'
        },
        'share': {
            'ja': '共有',
            'en': 'Share'
        }
    };

    const userLang = navigator.language || navigator.userLanguage;
    const lang = userLang.startsWith('ja') ? 'ja' : 'en';
    return translations[key][lang];
}

window.onload = () => {
    document.getElementById('title').innerHTML = getTranslation('title');
    document.getElementById('poem').innerHTML = getTranslation('poem');
    document.getElementById('startButton').textContent = getTranslation('start');
    document.getElementById('saveButton').textContent = getTranslation('save');
    document.getElementById('shareButton').textContent = getTranslation('share');
    generateRandomColorImage();
};