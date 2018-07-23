<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Factura;
use AppBundle\Controller\BaseController as Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Factura controller.
 *
 * @Route("factura")
 */
class FacturaController extends Controller
{
    /**
     * Lists all factura entities.
     *
     * @Route("/", name="factura_index")
     * @Method("GET")
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $facturas = $em->getRepository('AppBundle:Factura')->findAll();


        return $this->render('factura/index.html.twig', array(
            'facturas' => $facturas,

        ));
    }

    /**
     * Creates a new factura entity.
     *
     * @Route("/new", name="factura_new")
     * @Method({"GET", "POST"})
     */
    public function newAction(Request $request)
    {
      // inicio logica Factura
      $em = $this->getDoctrine()->getManager();
      $articulos = $em->getRepository('AppBundle:Articulo')->findAll();
      $clientes = $em->getRepository('AppBundle:Cliente')->findAll();
      //
        // $factura = new Factura();
        // $form = $this->createForm('AppBundle\Form\FacturaType', $factura);
        // $form->handleRequest($request);
        //
        // if ($form->isSubmitted() && $form->isValid()) {
        //     $em = $this->getDoctrine()->getManager();
        //     $em->persist($factura);
        //     $em->flush();
        //
        //     return $this->redirectToRoute('factura_show', array('id' => $factura->getId()));
        // }
        $isJSON = $this->isJsonRequest($request);
        $factura = new Factura();
        $form = $this->createForm('AppBundle\Form\FacturaType', $factura, [
            'csrf_protection' => !$isJSON,
        ]);

        if ($isJSON) {
            $data = json_decode($request->getContent(), true);
            $form->submit($data);
        }

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
          $em = $this->getDoctrine()->getManager();
          $em->persist($factura);
          $em->flush();
          $em->clear();

          return $this->redirectToRoute('factura_show', array('id' => $factura->getId()), 303);

      }

        return $this->render('factura/new.html.twig', array(
            'factura' => $factura,
            'articulos' => $articulos,
            'clientes' => $clientes,
        ));
    }

    /**
   * @Route("detalle_articulo_create", name="detalle_articulo_create")
   */
  public function addServices(Request $request)
  {
      $em = $this->getDoctrine()->getManager();
      $idArticuloPagado = $request->get('id_services');

      $ArticuloPagado = $em->getRepository('AppBundle:Articulo')
          ->findOneById($idArticuloPagado);

      return $this->render('factura/detalleFactura.html.twig', [
          'articuloActivo' => $ArticuloPagado,
      ]);
  }

    /**
     * Finds and displays a factura entity.
     *
     * @Route("/{id}", name="factura_show")
     * @Method("GET")
     */
    public function showAction(Factura $factura)
    {
        $deleteForm = $this->createDeleteForm($factura);

        return $this->render('factura/show.html.twig', array(
            'factura' => $factura,
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Displays a form to edit an existing factura entity.
     *
     * @Route("/{id}/edit", name="factura_edit")
     * @Method({"GET", "POST"})
     */
    public function editAction(Request $request, Factura $factura)
    {
        $deleteForm = $this->createDeleteForm($factura);
        $editForm = $this->createForm('AppBundle\Form\FacturaType', $factura);
        $editForm->handleRequest($request);

        if ($editForm->isSubmitted() && $editForm->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('factura_edit', array('id' => $factura->getId()));
        }

        return $this->render('factura/edit.html.twig', array(
            'factura' => $factura,
            'edit_form' => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Deletes a factura entity.
     *
     * @Route("/{id}", name="factura_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, Factura $factura)
    {
        $form = $this->createDeleteForm($factura);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($factura);
            $em->flush();
        }

        return $this->redirectToRoute('factura_index');
    }

    /**
     * Creates a form to delete a factura entity.
     *
     * @param Factura $factura The factura entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm(Factura $factura)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('factura_delete', array('id' => $factura->getId())))
            ->setMethod('DELETE')
            ->getForm()
        ;
    }
}
