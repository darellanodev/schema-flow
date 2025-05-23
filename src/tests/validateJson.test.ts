import { describe, it, expect } from 'vitest'
import { validateJson } from '../validateJson'

describe('validateJson', () => {
  it('should return false', () => {
    const data = ''
    const resultJson = JSON.parse(validateJson(data))
    expect(resultJson.isValid).toBe(false)
    expect(resultJson.message).toBe('Invalid JSON')
  })

  it('should return true', () => {
    const data =
      '{"schemaType":1,"course":"ofimática","units":[{"id":1,"title":"conceptos basicos"},{"id":2,"title":"tablas de unidades"},{"id":3,"title":"correcion ortografica"}],"active":2}'
    const resultJson = JSON.parse(validateJson(data))
    expect(resultJson.isValid).toBe(true)
    expect(resultJson.message).toBe('Valid JSON')
  })

  it('should return false if data is not json', () => {
    const data = 'xxx'
    const resultJson = JSON.parse(validateJson(data))
    expect(resultJson.isValid).toBe(false)
    expect(resultJson.message).toBe('Invalid JSON')
  })

  it('should return false if the schemaType is not present', () => {
    const data =
      '{"course":"ofimática","units":[{"id":1,"title":"conceptos basicos"},{"id":2,"title":"tablas de unidades"},{"id":3,"title":"correcion ortografica"}],"active":2}'
    const resultJson = JSON.parse(validateJson(data))
    expect(resultJson.isValid).toBe(false)
    expect(resultJson.message).toBe(
      'The schemaType property is missing in the JSON',
    )
  })

  it('should return false when there is not the course property in the JSON', () => {
    const data =
      '{"schemaType":1,"units":[{"id":1,"title":"conceptos basicos"},{"id":2,"title":"tablas de unidades"},{"id":3,"title":"correcion ortografica"}],"active":2}'
    const resultJson = JSON.parse(validateJson(data))
    expect(resultJson.isValid).toBe(false)
    expect(resultJson.message).toBe(
      'The course property is missing in the JSON',
    )
  })

  it('should return false when there is not the active property in the JSON', () => {
    const data =
      '{"schemaType":1,"course":"ofimática","units":[{"id":1,"title":"conceptos basicos"},{"id":2,"title":"tablas de unidades"},{"id":3,"title":"correcion ortografica"}]}'
    const resultJson = JSON.parse(validateJson(data))
    expect(resultJson.isValid).toBe(false)
    expect(resultJson.message).toBe(
      'The active property is missing in the JSON',
    )
  })

  it('should return false when there is not the units property in the JSON', () => {
    const data = '{"schemaType":1,"course":"ofimática","active":2}'
    const resultJson = JSON.parse(validateJson(data))
    expect(resultJson.isValid).toBe(false)
    expect(resultJson.message).toBe('The units property is missing in the JSON')
  })

  it('should return false when there are no units in the JSON', () => {
    const data = '{"schemaType":1,"course":"ofimática","active":2,"units":[]}'
    const resultJson = JSON.parse(validateJson(data))
    expect(resultJson.isValid).toBe(false)
    expect(resultJson.message).toBe('The units is empty in the JSON')
  })

  it('should return false when there is not id in a units', () => {
    const data =
      '{"schemaType":1,"course":"ofimática","units":[{"title":"conceptos basicos"},{"title":"tablas de unidades"},{"title":"correcion ortografica"}],"active":2}'
    const resultJson = JSON.parse(validateJson(data))
    expect(resultJson.isValid).toBe(false)
    expect(resultJson.message).toBe(
      'The id property is missing in the units JSON',
    )
  })

  it('should return false if the id is no active', () => {
    const data =
      '{"schemaType":1,"course":"ofimática","units":[{"id":1,"title":"conceptos basicos"},{"id":2,"title":"tablas de unidades"},{"id":3,"title":"correcion ortografica"}],"active":4}'
    const resultJson = JSON.parse(validateJson(data))
    expect(resultJson.isValid).toBe(false)
    expect(resultJson.message).toBe('The id is not active in the JSON')
  })

  it('should return false if does not have a title', () => {
    const data =
      '{"schemaType":1,"course":"ofimática","units":[{"id":1,"title":"conceptos basicos"},{"id":2,"title":"tablas de unidades"},{"id":3}],"active":2}'
    const resultJson = JSON.parse(validateJson(data))
    expect(resultJson.isValid).toBe(false)
    expect(resultJson.message).toBe(
      'The title property is missing in the units JSON',
    )
  })

  it('should return false if the course title is empty', () => {
    const data =
      '{"schemaType":1,"course":"","units":[{"id":1,"title":"conceptos basicos"},{"id":2,"title":"tablas de unidades"},{"id":3,"title":"correcion ortografica"}],"active":2}'
    const resultJson = JSON.parse(validateJson(data))
    expect(resultJson.isValid).toBe(false)
    expect(resultJson.message).toBe('The course title is empty in the JSON')
  })

  it('should return false if the active is not a number', () => {
    const data =
      '{"schemaType":1,"course":"ofimática","units":[{"id":1,"title":"conceptos basicos"},{"id":2,"title":"tablas de unidades"},{"id":3,"title":"correcion ortografica"}],"active":"2"}'
    const resultJson = JSON.parse(validateJson(data))
    expect(resultJson.isValid).toBe(false)
    expect(resultJson.message).toBe('The active is not a number in the JSON')
  })
})

