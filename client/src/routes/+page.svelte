<script lang="ts">
	import { WebsocketBuilder } from 'websocket-ts';
	import { PUBLIC_SERVER_URL } from '$env/static/public';

	const ws = new WebsocketBuilder(`ws://${PUBLIC_SERVER_URL}`)
		.onError((i, ev) => {
			console.log('error');
		})
        .onMessage((i, ev) => {
            console.log(ev.data);
        })
		.build();
    
    function sendMessage() {
        ws.send("ping")
    }
</script>

<button onclick={sendMessage} class="m-3 cursor-pointer rounded border p-2">Send "ping" message</button>
