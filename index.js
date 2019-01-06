const sequence = ( f = (i,n) => i, ini = 0, generateOnStart ) => {
    const
        sq = Array.isArray(ini) ? ini.slice() : [ini],
        produceNext = () => sq.push(
            f(
                sq.length,
                offset =>
                    sq[Math.max(
                        0,
                        sq.length + offset)],
            ))
        ,
        produce = last => {
            while (last >= sq.length) {
                produceNext()
            }
            return sq
        },

        slice = (start, end) => produce(end).slice(start, end),

        take = amount => slice(0, amount),

        get = i => produce(i).slice(i, i + 1);

    if (generateOnStart) {
        take (generateOnStart)
    }

    return {take, get, slice}
};

if (typeof module !== "undefined")
    module.exports = sequence;

