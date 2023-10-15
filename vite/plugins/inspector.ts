import Inspector from 'vite-plugin-vue-inspector'

export default function createInspector() {
  return Inspector({
    enabled: false,
    // openInEditorHost: 'http://localhost:5173',
    toggleButtonVisibility: 'always',
  })
}
