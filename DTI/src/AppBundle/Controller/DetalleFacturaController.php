<?php

namespace AppBundle\Controller;

use AppBundle\Entity\DetalleFactura;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;

/**
 * Detallefactura controller.
 *
 * @Route("detallefactura")
 */
class DetalleFacturaController extends Controller
{
    /**
     * Lists all detalleFactura entities.
     *
     * @Route("/", name="detallefactura_index")
     * @Method("GET")
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $detalleFacturas = $em->getRepository('AppBundle:DetalleFactura')->findAll();

        return $this->render('detallefactura/index.html.twig', array(
            'detalleFacturas' => $detalleFacturas,
        ));
    }

    /**
     * Creates a new detalleFactura entity.
     *
     * @Route("/new", name="detallefactura_new")
     * @Method({"GET", "POST"})
     */
    public function newAction(Request $request)
    {
        $detalleFactura = new Detallefactura();
        $form = $this->createForm('AppBundle\Form\DetalleFacturaType', $detalleFactura);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($detalleFactura);
            $em->flush();

            return $this->redirectToRoute('detallefactura_show', array('id' => $detalleFactura->getId()));
        }

        return $this->render('detallefactura/new.html.twig', array(
            'detalleFactura' => $detalleFactura,
            'form' => $form->createView(),
        ));
    }

    /**
     * Finds and displays a detalleFactura entity.
     *
     * @Route("/{id}", name="detallefactura_show")
     * @Method("GET")
     */
    public function showAction(DetalleFactura $detalleFactura)
    {
        $deleteForm = $this->createDeleteForm($detalleFactura);

        return $this->render('detallefactura/show.html.twig', array(
            'detalleFactura' => $detalleFactura,
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Displays a form to edit an existing detalleFactura entity.
     *
     * @Route("/{id}/edit", name="detallefactura_edit")
     * @Method({"GET", "POST"})
     */
    public function editAction(Request $request, DetalleFactura $detalleFactura)
    {
        $deleteForm = $this->createDeleteForm($detalleFactura);
        $editForm = $this->createForm('AppBundle\Form\DetalleFacturaType', $detalleFactura);
        $editForm->handleRequest($request);

        if ($editForm->isSubmitted() && $editForm->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('detallefactura_edit', array('id' => $detalleFactura->getId()));
        }

        return $this->render('detallefactura/edit.html.twig', array(
            'detalleFactura' => $detalleFactura,
            'edit_form' => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Deletes a detalleFactura entity.
     *
     * @Route("/{id}", name="detallefactura_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, DetalleFactura $detalleFactura)
    {
        $form = $this->createDeleteForm($detalleFactura);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($detalleFactura);
            $em->flush();
        }

        return $this->redirectToRoute('detallefactura_index');
    }

    /**
     * Creates a form to delete a detalleFactura entity.
     *
     * @param DetalleFactura $detalleFactura The detalleFactura entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm(DetalleFactura $detalleFactura)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('detallefactura_delete', array('id' => $detalleFactura->getId())))
            ->setMethod('DELETE')
            ->getForm()
        ;
    }
}
