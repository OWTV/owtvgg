import { withPayload } from "@payloadcms/next/withPayload";

export default withPayload({
	serverExternalPackages: ["pino", "pino-pretty", "thread-stream"],
});
