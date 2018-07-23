<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

class BaseController extends Controller
{
    /**
     * Return a response with JSON.
     *
     * @param object $entity
     * @param int    $status
     * @param array  $headers
     *
     * @return JsonResponse
     */
    protected function replyJson($entity, $status = 200, $headers = array())
    {
        $serializer = $this->get('jms_serializer');

        return new JsonResponse($serializer->serialize($entity, 'json'), $status, $headers, true);
    }

    /**
     * Get entity from JSON.
     *
     * @param string $json
     * @param string $entityName
     *
     * @return object
     */
    protected function deserializeJson($json, $entityName)
    {
        $serializer = $this->get('jms_serializer');

        return $serializer->deserialize($json, $entityName, 'json');
    }

    /**
     * Reply with HTML or JSON.
     *
     * @param string $view
     * @param array  $parameters
     * @param int    $status
     *
     * @return Response
     */
    protected function reply($view, $parameters, $status = 200)
    {
        $request = $this->container->get('request_stack')->getCurrentRequest();

        if ($this->wantsJsonResponse($request)) {
            $entity = reset($parameters);

            return $this->replyJson($entity, $status);
        }

        $response = 200 != $status ? new Response('', $status) : null;

        return $this->render($view, $parameters, $response);
    }

    /**
     * Returns a new UnprocessableEntityHttpException.
     *
     * This will result in a 422 response code. Usage example:
     *
     *     throw $this->createUnprocessableEntityException('Unable to be accepted due to assert errors!');
     *
     * @param string          $message
     * @param \Exception|null $previous
     *
     * @return UnprocessableEntityHttpException
     */
    protected function createUnprocessableEntityException(
        $message = 'The request was well-formed but was unable to be accepted due to constraints.',
        \Exception $previous = null
    ) {
        return new UnprocessableEntityHttpException($message, $previous);
    }

    /**
     * Get errors from FormType.
     *
     * @param FormInterface $form
     *
     * @return array
     */
    protected function getErrorsFromForm(FormInterface $form)
    {
        $errors = array();

        foreach ($form->getErrors() as $error) {
            $errors[] = $error->getMessage();
        }

        foreach ($form->all() as $childForm) {
            if ($childForm instanceof FormInterface) {
                if ($childErrors = $this->getErrorsFromForm($childForm)) {
                    $errors[$childForm->getName()] = $childErrors;
                }
            }
        }

        return $errors;
    }

    /**
     * Returns a JSON response with the form's errors.
     *
     * @param FormInterface $form
     *
     * @return Response
     */
    protected function createValidationErrorResponse(FormInterface $form)
    {
        $errors = $this->getErrorsFromForm($form);
        $data = [
            'type' => 'VALIDATION_ERROR',
            'title' => 'Unprocessable Entity',
            'errors' => $errors,
        ];

        return new JsonResponse($data, 422);
    }

    /**
     * The request contains a JSON body?
     *
     * @param Request $request
     *
     * @return bool
     */
    protected function isJsonRequest(Request $request)
    {
        return (bool) preg_match('/application\/json/', $request->headers->get('Content-Type'));
    }

    /**
     * The request accept a JSON response?
     *
     * @param Request $request
     *
     * @return bool
     */
    protected function wantsJsonResponse(Request $request)
    {
        return (bool) preg_match('/application\/json/', $request->headers->get('Accept'));
    }
}
