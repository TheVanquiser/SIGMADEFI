import create from 'zustand'

const useStore = create(() => ({
	bears: 0,
	increasePopulation: () => ({ bears: state => state.bears + 1 }),
	canistersId: 12314,
	setCanistersID: (canistersId) => (_state => ({ canistersId: canistersId })),
	canistersIdMsg: '',
	setCanistersIDMsg: (canistersIdMsg) => (_state => ({ canistersIdMsg: canistersIdMsg })),
}))
	
export default useStore