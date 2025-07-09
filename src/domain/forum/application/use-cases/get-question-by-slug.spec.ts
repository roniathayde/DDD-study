import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { makeQuestion } from 'test/factories/make-question'
import { Slug } from '../../enterprise/entities/value-objects/slug'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe(`Get question by slug`, () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()

    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository) // System Under Test
  })

  it('should be able to get a question by slug', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create(`example-question`),
    })

    inMemoryQuestionsRepository.create(newQuestion)

    const { question } = await sut.execute({
      slug: newQuestion.slug.value,
    })

    expect(question.id).toBeTruthy()
    expect(question.title).toEqual(newQuestion.title)
    expect(inMemoryQuestionsRepository.items[0].id).toEqual(question.id)
  })
})
