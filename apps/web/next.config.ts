import { withPayload } from "@payloadcms/next/withPayload";

export default withPayload({
	serverExternalPackages: ["@payloadcms/db-postgres"],
});
