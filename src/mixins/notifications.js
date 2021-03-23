/* eslint-disable no-tabs */
/* eslint-disable no-undef */

export const notifications = {
  data () {
    return {
      // Izitoast
      notificationSystem: {
        options: {
          ballon: {
            balloon: true,
            position: 'bottomCenter'
          },
          info: {
            position: 'topRight'
          },
          success: {
            position: 'topRight',
            close: true,
            closeOnEscape: false,
            timeout: 5000,
            displayMode: 2
          },
          warning: {
            position: 'topRight'
          },
          error: {
            position: 'topRight',
            displayMode: 2,
            timeout: 5000,
          },
          question: {
            timeout: 20000,
            close: false,
            overlay: true,
            toastOnce: true,
            id: 'question',
            zindex: 999,
            position: 'center',
            buttons: [
              ['<button><b>YES</b></button>', function (instance, toast) {
                instance.hide({ transitionOut: 'fadeOut' }, toast, 'button')
              }, true],
              ['<button>NO</button>', function (instance, toast) {
                instance.hide({ transitionOut: 'fadeOut' }, toast, 'button')
              }]
            ],
            // eslint-disable-next-line no-unused-vars
            onClosing: function (instance, toast, closedBy) {
              console.info('Closing | closedBy: ' + closedBy)
            },
            onClosed: function (instance, toast, closedBy) {
              console.info('Closed | closedBy: ' + closedBy)
            }
          }
        }
      }
    }
  },
  methods: {
    showDefaultNotification (title, icon, toastColor, path, customTheme, position, timeout) {
      this.$toast.show(' ', title,
        {
          theme: customTheme || 'dark',
          icon: icon,
          timeout: timeout || 50000,
          iconColor: toastColor,
          close: false,
          overlay: false,
          transitionIn: 'bounceInRight',
          layout: 1,
          iconUrl: '/img/tooltip-lightning.svg',
          displayMode: 2,
          position: position || 'bottomRight', // bottomLeft, topRight, topLeft, topCenter, bottomCenter
          // progressBarColor: '#FF2E2E',
          progressBarColor: 'rgb(250, 189, 16)',
          buttons: [
            ['<button>Ok</button>', function (instance, toast) {
              instance.hide({
                transitionOut: 'fadeOutUp'
              }, toast, 'buttonName')
              that.$router.push(path)
            }, true] // true to focus
          ],
          // eslint-disable-next-line no-unused-vars
          onOpening: function (instance, toast) {
          },
          onClosing: function (instance, toast, closedBy) {
            console.info('closedBy: ' + closedBy) // tells if it was closed by 'drag' or 'button'
          }
        })
    },
    // eslint-disable-next-line no-unused-vars
    showWithdrawalSocketNotification (title, path, iconUrl, withdrawalID) {
      this.$toast.show(' ', title,
        {
          theme: 'dark',
          timeout: false,
          close: false,
          overlay: true,
          transitionIn: 'bounceInRight',
          layout: 1,
          id: 'socketNotification',
          toastOnce: true,
          iconUrl: '../../img/icons/icon-36x36.png',
          displayMode: 2,
          backgroundColor: '#0046ff',
          position: 'topCenter', // bottomLeft, topRight, topLeft, topCenter, bottomCenter
          progressBarColor: '#213a1b',
          buttons: [
            [`<button>Close</button>`, function (instance, toast) {
              instance.hide({
                transitionOut: 'fadeOutUp'
              }, toast, 'buttonName')
            }, false]
          ],
          // eslint-disable-next-line no-unused-vars
          onOpening: function (instance, toast) {
          },
          onClosing: function (instance, toast, closedBy) {
            console.info('closedBy: ' + closedBy) // tells if it was closed by 'drag' or 'button'
          }
        })
    },
    showDefaultNotificationWithModalAction (title, icon, toastColor, path, customTheme, position, timeout) {
      this.$toast.show(' ', title,
        {
          theme: customTheme || 'dark',
          icon: icon,
          timeout: timeout || 50000,
          iconColor: toastColor,
          close: false,
          overlay: false,
          transitionIn: 'bounceInRight',
          layout: 1,
          iconUrl: '/img/tooltip-lightning.svg',
          displayMode: 2,
          position: position || 'bottomRight', // bottomLeft, topRight, topLeft, topCenter, bottomCenter
          // progressBarColor: '#FF2E2E',
          progressBarColor: 'rgb(250, 189, 16)',
          buttons: [
            ['<button>Ok</button>', function (instance, toast) {
              instance.hide({
                transitionOut: 'fadeOutUp'
              }, toast, 'buttonName')
              $(path).modal({
                show: true,
                keyboard: false,
                backdrop: 'static'
              })
            }, true] // true to focus
          ],
          // eslint-disable-next-line no-unused-vars
          onOpening: function (instance, toast) {
          },
          onClosing: function (instance, toast, closedBy) {
            console.info('closedBy: ' + closedBy) // tells if it was closed by 'drag' or 'button'
          }
        })
    },
    showSuccessLoginNotification () {
      this.$toast.success('Successfully Logged In!', 'OK', this.notificationSystem.options.success)
    },
    showErrorLoginNotification (errorMessage) {
      this.$toast.error(`${errorMessage}`, 'Error', this.notificationSystem.options.error)
    },
    showErrorRegistrationNotification (statusText) {
      this.$toast.error('*', statusText, this.notificationSystem.options.error)
    },
    showSuccessNotification (value) {
      this.$toast.success(value || 'Operation successful!', 'OK', this.notificationSystem.options.success)
    },
    showErrorNotification (value) {
      this.$toast.error(value || 'Operation failed', 'Error', this.notificationSystem.options.error)
    },
    showWarningNotification (statusText) {
      this.$toast.info(statusText, 'Warning', this.notificationSystem.options.info)
    }
  }
}

/* eslint-enable no-unused-vars */

