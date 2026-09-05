function DescriptionInput({ description, setDescription }) {
  return (
    <div className="w-full">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          Describe the Situation
        </h2>

        <span className="text-xs text-gray-500">
          {description.length}/300
        </span>
      </div>

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        maxLength={300}
        rows={5}
        placeholder="Example: My dog destroyed the room while I was away..."
        className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white outline-none placeholder:text-gray-500 focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30"
      />

      <p className="mt-2 text-xs text-gray-500">
        Add a little context to help AI create better captions.
      </p>
    </div>
  );
}

export default DescriptionInput;