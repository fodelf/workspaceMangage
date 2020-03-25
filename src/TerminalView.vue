<template>
  <div id="xterm"
       class="xterm" />
</template>

<script>
import 'xterm/css/xterm.css'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { AttachAddon } from 'xterm-addon-attach'

export default {
  name: 'Xterm',
  props: {
    socketURI: {
      type: String,
      default: ''
    },
  },
  mounted () {
    // this.initTerm()
    this.initSocket()
  },
  beforeDestroy () {
    this.socket.close()
    this.term.dispose()
  },
  methods: {
    initTerm () {
      const term = new Terminal({
        fontSize: 14,
        cursorBlink: true
      });
      const attachAddon = new AttachAddon(this.socket);
      const fitAddon = new FitAddon();
      term.loadAddon(attachAddon);
      term.loadAddon(fitAddon);
      term.open(document.getElementById('xterm'));
      fitAddon.fit();
      term.focus();
      this.term = term
    },
    initSocket () {
      this.socket = new WebSocket('ws://localhost:4001');
      this.socketOnClose();
      this.socketOnOpen();
      this.socketOnError();
      this.socketOnMes();
    },
    socketOnMes () {
      var that = this
      this.socket.onmessage = function () {
        // var received_msg = evt.data;
        that.term.writeln('ss');
      };
    },
    socketOnOpen () {
      this.socket.onopen = () => {
        // 链接成功后
        this.initTerm()
      }
    },
    socketOnClose () {
      this.socket.onclose = () => {
        // console.log('close socket')
      }
    },
    socketOnError () {
      this.socket.onerror = () => {
        // console.log('socket 链接失败')
      }
    }
  }
}
</script>
