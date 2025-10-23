using System.Collections.Generic;
using UnityEngine;
using UnityEngine.XR.ARFoundation;
using UnityEngine.XR.ARSubsystems;

[RequireComponent(typeof(ARTrackedImageManager))]
public class ARImageTracker : MonoBehaviour
{
    public List<GameObject> Prefabs; // Prefab names must match Reference Image names

    private ARTrackedImageManager _manager;
    private readonly Dictionary<string, GameObject> _spawned = new();
    private readonly Dictionary<string, GameObject> _prefabMap = new();

    void Awake()
    {
        _manager = GetComponent<ARTrackedImageManager>();
        foreach (var prefab in Prefabs)
        {
            if (prefab != null && !_prefabMap.ContainsKey(prefab.name))
            {
                _prefabMap[prefab.name] = prefab;
            }
        }
    }

    void OnEnable()
    {
        _manager.trackedImagesChanged += OnChanged;
    }

    void OnDisable()
    {
        _manager.trackedImagesChanged -= OnChanged;
    }

    private void OnChanged(ARTrackedImagesChangedEventArgs args)
    {
        foreach (var added in args.added)
        {
            UpdateSpawn(added);
        }

        foreach (var updated in args.updated)
        {
            UpdateSpawn(updated);
        }

        foreach (var removed in args.removed)
        {
            var key = removed.referenceImage.name;
            if (_spawned.TryGetValue(key, out var go))
            {
                Destroy(go);
                _spawned.Remove(key);
            }
        }
    }

    private void UpdateSpawn(ARTrackedImage tracked)
    {
        var name = tracked.referenceImage.name;
        if (!_prefabMap.TryGetValue(name, out var prefab)) return;

        if (!_spawned.TryGetValue(name, out var go))
        {
            go = Instantiate(prefab, tracked.transform);
            _spawned[name] = go;
        }

        bool visible = tracked.trackingState == TrackingState.Tracking;
        go.SetActive(visible);
        if (visible)
        {
            go.transform.SetPositionAndRotation(tracked.transform.position, tracked.transform.rotation);
            var size = tracked.size; // Optional: scale based on marker size
            go.transform.localScale = new Vector3(size.x, go.transform.localScale.y, size.y);
        }
    }
}
