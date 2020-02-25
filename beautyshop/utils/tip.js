/**
 * 提示与加载工具类
 */

var tips = {
    isloading: false,
    toast(title, onHide, icon = "success") {
        setTimeout(() => {
            wx.showToast({
                title: title,
                icon: icon,
                mask: true,
                duration: 1000
            });
        }, 200);

        // 隐藏结束回调
        if (onHide) {
            setTimeout(() => {
                onHide();
            }, 1000);
        }
    },
    confirm(text, title = "提示") {
        return new Promise((resolve, reject) => {
            wx.showModal({
                title: title,
                content: text,
                showCancel: true,
                success: res => {
                    if (res.confirm) {
                        resolve(res);
                    } else if (res.cancel) {
                        reject(res);
                    }
                },
                fail: res => {
                    reject(res);
                }
            });
        });
    },
    error(title) {
        wx.showToast({
            title: title,
            image: '/imgs/error.png',
            mask: false,
            duration: 2000
        });
    },
    loading(title = "加载中") {
        if (tips.isloading) {
            return;
        }
        tips.isloading = true;
        wx.showLoading({
            title: title,
            mask: true
        });
    },
    loaded() {
        if (tips.isloading) {
            tips.isloading = false;
            wx.hideLoading();
        }
    }
}

export {
    tips
}
