function LoadingSkeleton() {
  return (
    <section className="mt-8">
      <div className="mb-5">
        <h2 className="text-2xl font-bold">
          Generating Captions...
        </h2>

        <p className="mt-1 text-sm text-gray-400">
          AI is creating captions for you.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="animate-pulse rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <div className="mb-4 h-3 w-20 rounded bg-white/10" />

            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-white/10" />
              <div className="h-4 w-4/5 rounded bg-white/10" />
              <div className="h-4 w-3/5 rounded bg-white/10" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default LoadingSkeleton;