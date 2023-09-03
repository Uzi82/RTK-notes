import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export type note = {
    id: number,
    title: string
}

export const notesApi = createApi({
    reducerPath: 'notesApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001'}),
    tagTypes: ['Notes'],
    endpoints: (build) => ({
        getNotes: build.query<Array<note>, void>({
            query: () => ({
                url: 'notes'
            }),
            providesTags: () => ['Notes']
        }),
        addNotes: build.mutation<note, note>({
            query: (note) => ({
                url: 'notes',
                method: 'POST',
                body: note
            }),
            invalidatesTags: ['Notes']
        }),
        deleteNote: build.mutation<note, note>({
            query: (note) => ({
                url: `notes/${note.id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Notes']
        })
    })
})

export const { useGetNotesQuery, useAddNotesMutation, useDeleteNoteMutation } = notesApi