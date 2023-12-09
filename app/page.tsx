import { createAssetAction, getAssetsAction } from "@/lib/actions/asset";
import {
  createCollectionAction,
  getCollectionsAction,
} from "@/lib/actions/collection";
import { createProjectAction, getProjectsAction } from "@/lib/actions/project";

export default async function Home() {
  const collections = await getCollectionsAction();
  const projects = await getProjectsAction();
  const assets = await getAssetsAction();

  return (
    <div>
      <form action={createCollectionAction}>
        <button type="submit">Create Collection</button>
      </form>

      <form action={createProjectAction}>
        <button type="submit">Create Project</button>
      </form>

      <form action={createAssetAction}>
        <button type="submit">Create Asset</button>
      </form>

      <h2>Collections</h2>
      {collections.map((collection) => (
        <div key={collection.id}>
          <p>
            {collection.id} | {collection.createdAt.toISOString()}
          </p>

          <pre>{JSON.stringify(collection.items)}</pre>
        </div>
      ))}

      <h2>Projects</h2>
      {projects.map((project) => (
        <p key={project.id}>
          {project.id} | {project.createdAt.toISOString()}
        </p>
      ))}
      <h2>Assets</h2>
      {assets.map((asset) => (
        <p key={asset.id}>
          {asset.id} | {asset.createdAt.toISOString()}
        </p>
      ))}
    </div>
  );
}
