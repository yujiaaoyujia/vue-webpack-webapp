import { shallowMount } from '@vue/test-utils'
import Counter from '@/components/Counter'

describe('Counter.vue', () => {
  it('increments count when button is clicked', () => {
    const wrapper = shallowMount(Counter)
    expect(wrapper.vm.count).toBe(0)

    wrapper.find('button').trigger('click')
    expect(wrapper.vm.count).toBe(1)

    expect(wrapper.find('p').text()).toMatch('1')
  })
})
